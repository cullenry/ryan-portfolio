import type { MetadataRoute } from "next";

const siteUrl = "https://ryan-portfolio-three-beryl.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/cv"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
