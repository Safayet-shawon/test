"use client";
import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------------------------
// SandField — the hero's material. Tens of thousands of grains are drawn as WebGL points.
// Every grain's position is computed on the GPU from four random numbers and a few uniforms,
// so the CPU only updates uniforms each frame.
//   progress 0  → a lit dune field, grains drifting in the wind
//   progress 1  → the same grains settled into an engineered lattice with standing modules
// The pointer presses into the sand (and lights the lattice). The loop stops when the hero is
// off screen or the tab is hidden; reduced-motion users get one still frame.
// ---------------------------------------------------------------------------------------------

const VERT = /* glsl */ `
precision highp float;
attribute vec4 a_seed;
uniform float u_time, u_progress, u_intro, u_aspect, u_dpr, u_size;
uniform vec2 u_pointer;
uniform float u_pointerOn;
varying vec3 v_color;
varying float v_alpha;

const float F = 1.25;        // focal length
const float GROUND = -0.8;  // ground plane below the camera
const float PI = 3.14159265;

float dune(float x, float z, float t) {
  float h = 0.19 * sin(x * 0.55 + z * 1.9 + 0.6 + t * 0.05)
          + 0.10 * sin(x * 1.35 - z * 2.7 + 1.7 - t * 0.04)
          + 0.035 * sin(x * 4.1 + z * 5.3 + t * 0.12)
          + 0.012 * sin(x * 13.0 - z * 9.0 + t * 0.6);
  return h;
}
float hash(float n) { return fract(sin(n) * 43758.5453); }

void main() {
  float r0 = a_seed.x, r1 = a_seed.y, r2 = a_seed.z, r3 = a_seed.w;
  float t = u_time;

  // ---------- sand ----------
  float d = 1.0 + pow(r1, 1.35) * 6.0;                 // distance from camera (denser near the horizon)
  float span = d * u_aspect / F * 1.08;
  float wind = t * (0.035 + r2 * 0.03);                  // grains creep with the wind, wrapping around
  float xn = fract(r0 + wind / (2.0 * span) ) * 2.0 - 1.0;
  float x = xn * span;
  float h = dune(x, d, t);
  float eps = 0.04;
  float slope = (dune(x + eps, d, t) - h) / eps;         // light comes from the left: facing slopes are bright
  // saltation: a few grains hop above the crest
  float hop = step(0.965, r3) * max(0.0, sin(t * (1.2 + r2) + r0 * 40.0)) * 0.05;
  vec3 sand = vec3(x, GROUND + h + hop, d);

  // ---------- structure ----------
  // 72% of grains form a precise ground lattice, the rest stand up as wireframe modules.
  vec3 grid;
  float onLine = 0.0;
  float cells = 14.0;
  if (r3 < 0.72) {
    float gd = 1.2 + r1 * 5.6;
    float gs = 2.6;                                       // lattice half-width in world units
    if (r2 < 0.5) {                                       // lines running across
      float row = floor(r1 * cells) / cells;
      gd = 1.2 + row * 5.6;
      grid = vec3((r0 * 2.0 - 1.0) * gs, GROUND + 0.02, gd);
      onLine = fract(r0 * 3.0 - t * 0.12);
    } else {                                              // lines running into the distance
      float col = floor(r0 * cells) / (cells - 1.0) * 2.0 - 1.0;
      grid = vec3(col * gs, GROUND + 0.02, gd);
      onLine = fract(r1 * 3.0 - t * 0.12);
    }
  } else {
    // modules: rectangular frames standing on lattice cells
    float k = floor(((r3 - 0.72) / 0.28) * 7.0);          // 7 modules
    float mx = (hash(k * 3.1) * 2.0 - 1.0) * 1.9;
    mx = floor(mx * 4.0 + 0.5) / 4.0;
    float md = 2.2 + floor(hash(k * 7.7) * 4.0) * 0.9;
    float mh = 0.35 + hash(k * 1.9) * 0.9;
    float mw = 0.28 + hash(k * 5.3) * 0.32;
    float e = floor(r2 * 4.0);                            // which edge of the frame
    float s = r0;
    vec2 p;
    if (e < 1.0) p = vec2(-mw + 2.0 * mw * s, 0.0);
    else if (e < 2.0) p = vec2(-mw + 2.0 * mw * s, mh);
    else if (e < 3.0) p = vec2(-mw, mh * s);
    else p = vec2(mw, mh * s);
    // a few grains fill the face as horizontal "rows", like lines of an interface
    if (r1 > 0.82) p = vec2(-mw * 0.8 + 1.6 * mw * s * (0.4 + 0.6 * hash(floor(r1 * 40.0))), mh * (0.18 + floor(r1 * 40.0 - 32.8) / 8.0 * 0.7));
    grid = vec3(mx + p.x, GROUND + 0.02 + p.y, md);
    onLine = fract(s * 2.0 - t * 0.2);
  }

  // ---------- transition: a sweep from left to right, grains arc up and settle ----------
  float sweep = (xn * 0.5 + 0.5) * 0.55 + r2 * 0.25;
  float m = clamp((u_progress * 1.8 - sweep) / 0.55, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  vec3 pos = mix(sand, grid, m);
  pos.y += sin(m * PI) * (0.25 + r3 * 0.35);

  // ---------- intro: dust settles into the dunes ----------
  float ii = clamp(u_intro * 1.4 - r2 * 0.4, 0.0, 1.0);
  ii = 1.0 - pow(1.0 - ii, 3.0);
  vec3 dust = vec3(x * (0.6 + r3 * 0.8), GROUND + 0.4 + r3 * 1.6, d * (0.7 + r0 * 0.5));
  pos = mix(dust, pos, ii);

  // ---------- project ----------
  vec2 ndc = vec2(pos.x / pos.z * F / u_aspect, pos.y / pos.z * F + 0.06);

  // pointer: grains part around it (screen space), stronger close to the camera
  vec2 dv = ndc - u_pointer;
  dv.x *= u_aspect;
  float pd = length(dv);
  float push = u_pointerOn * smoothstep(0.26, 0.0, pd) * (1.0 - m * 0.85);
  ndc += normalize(dv + 1e-5) * push * 0.06 / max(pos.z * 0.6, 0.6) * vec2(1.0 / u_aspect, 1.0);

  gl_Position = vec4(ndc, 0.0, 1.0);

  float size = u_size * (1.6 / pos.z) * (0.55 + r3 * 0.9);
  gl_PointSize = clamp(size * u_dpr, 1.0, 4.5 * u_dpr);

  // ---------- colour ----------
  vec3 cSand  = vec3(0.902, 0.827, 0.714);   // #E6D3B6
  vec3 cDune  = vec3(0.839, 0.749, 0.596);   // #D6BF98
  vec3 cAmber = vec3(0.788, 0.608, 0.380);   // #C99B61
  vec3 cBronze= vec3(0.663, 0.427, 0.216);   // #A96D37
  vec3 cRust  = vec3(0.478, 0.271, 0.153);   // #7A4527
  vec3 cIvory = vec3(0.973, 0.961, 0.937);   // #F8F5EF

  float light = clamp(0.55 - slope * 1.6, 0.0, 1.0);
  vec3 base = mix(cDune, cSand, r0);
  vec3 sandCol = mix(mix(cRust, cBronze, light), mix(cAmber, base, light), light);
  sandCol = mix(sandCol, cSand, step(0.97, r3) * 0.5);

  float pulse = smoothstep(0.035, 0.0, abs(onLine - 0.5));
  vec3 gridCol = mix(mix(cAmber, cIvory, 0.35 + r1 * 0.3), cIvory, pulse);

  vec3 col = mix(sandCol, gridCol, m);
  col += push * vec3(0.25, 0.18, 0.08) * (0.5 + m);

  float fog = mix(0.3, 1.0, smoothstep(7.5, 1.6, pos.z));
  v_color = col;
  v_alpha = fog * mix(0.85, 0.75 + pulse * 0.25, m) * (0.35 + 0.65 * ii);
}
`;

const FRAG = /* glsl */ `
precision mediump float;
varying vec3 v_color;
varying float v_alpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = dot(c, c);
  if (r > 0.25) discard;
  float a = v_alpha * smoothstep(0.25, 0.08, r);
  gl_FragColor = vec4(v_color * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log || "shader compile failed");
  }
  return s;
}

type Props = {
  /** 0..1, written by the hero's scroll timeline */
  progress: React.RefObject<number>;
  onReady?: () => void;
};

export default function SandField({ progress, onReady }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" });
    if (!gl) return; // static CSS fallback stays visible

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
    const COUNT = small ? 26000 : lowCores ? 50000 : 90000;

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link failed");
    } catch (e) {
      console.warn("[SandField] WebGL unavailable, using the still background.", e);
      return;
    }
    gl.useProgram(prog);

    // deterministic seeds so the composition is the same on every visit
    const seeds = new Float32Array(COUNT * 4);
    let s = 1234567;
    for (let i = 0; i < seeds.length; i++) {
      s = (s * 16807) % 2147483647;
      seeds[i] = (s - 1) / 2147483646;
    }
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_seed");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      time: U("u_time"),
      progress: U("u_progress"),
      intro: U("u_intro"),
      aspect: U("u_aspect"),
      dpr: U("u_dpr"),
      size: U("u_size"),
      pointer: U("u_pointer"),
      pointerOn: U("u_pointerOn"),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(u.aspect, w / Math.max(h, 1));
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.size, small ? 1.9 : 1.75);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // pointer, eased
    const ptr = { x: 0, y: -2, tx: 0, ty: -2, on: 0, ton: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
      ptr.ton = 1;
    };
    const onLeave = () => (ptr.ton = 0);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let visible = true;
    let running = false;
    let smooth = progress.current ?? 0;
    const t0 = performance.now();
    let readySent = false;

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      smooth += ((progress.current ?? 0) - smooth) * 0.08;
      ptr.x += (ptr.tx - ptr.x) * 0.12;
      ptr.y += (ptr.ty - ptr.y) * 0.12;
      ptr.on += (ptr.ton - ptr.on) * 0.06;
      gl.uniform1f(u.time, reduce ? 8 : t + 8);
      gl.uniform1f(u.progress, smooth);
      gl.uniform1f(u.intro, reduce ? 1 : Math.min(1, t / 2.6));
      gl.uniform2f(u.pointer, ptr.x, ptr.y);
      gl.uniform1f(u.pointerOn, reduce ? 0 : ptr.on);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, COUNT);
      if (!readySent) {
        readySent = true;
        onReady?.();
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // reduced motion: a single still frame, redrawn only when the scroll position changes it
    let stillRaf = 0;
    const still = () => {
      cancelAnimationFrame(stillRaf);
      stillRaf = requestAnimationFrame((n) => {
        smooth = progress.current ?? 0;
        draw(n);
      });
    };
    if (reduce) {
      still();
      window.addEventListener("scroll", still, { passive: true });
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      cancelAnimationFrame(stillRaf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", still);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [progress, onReady]);

  return <canvas ref={ref} aria-hidden="true" />;
}
