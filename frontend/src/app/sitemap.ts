import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

const ROUTES = ["", "/services", "/work", "/process", "/after-launch", "/about", "/quote", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: SITE.url + r,
    lastModified: now,
    changeFrequency: r === "" || r === "/work" ? "monthly" : "yearly",
    priority: r === "" ? 1 : ["/quote", "/services", "/work"].includes(r) ? 0.8 : 0.5,
  }));
}
