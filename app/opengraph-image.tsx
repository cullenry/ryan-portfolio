import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Ryan Cullen: Computer Science & Business at Trinity College Dublin. Now building TheoryPrep.";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({
    kicker: "Portfolio",
    footnote: "Software where code meets markets, from trading engines to TheoryPrep.",
  });
}
