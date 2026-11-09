/** @type {import('next').NextConfig} */
const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1200, 1600],
    imageSizes: [320, 480],
  },
  // Screenshots, hero images and videos: browsers keep them for 7 days and refresh them quietly in
  // the background after that. IMPORTANT: when you replace one of these files, give it a NEW NAME
  // (e.g. waves-day-2.webp), otherwise returning visitors keep seeing the old one for up to a week.
  async headers() {
    return [
      { source: "/projects/:path*", headers: cache },
      { source: "/hero/:path*", headers: cache },
      { source: "/video/:path*", headers: cache },
    ];
  },
};
export default nextConfig;
