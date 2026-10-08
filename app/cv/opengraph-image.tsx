import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Curriculum vitae of Ryan Cullen, Computer Science & Business student at Trinity College Dublin.";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({
    kicker: "Curriculum vitae",
    footnote: "Projects, experience, education and skills, all on one page.",
  });
}
