import { siteConfig } from "@/lib/site"
import type { MetadataRoute } from "next"

const routes = ["", "/about", "/skill", "/project", "/contact"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.7,
  }))
}
