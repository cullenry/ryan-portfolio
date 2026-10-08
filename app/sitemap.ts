import type { MetadataRoute } from "next";
import { build, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: build.date, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/cv`, lastModified: build.date, changeFrequency: "monthly", priority: 0.8 },
  ];
}
