import type { MetadataRoute } from "next";

const siteUrl = "https://ryan-portfolio-three-beryl.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/cv`,
    },
  ];
}
