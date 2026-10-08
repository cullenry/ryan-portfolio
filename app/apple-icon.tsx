import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const italic = await readFile(join(process.cwd(), "assets/fonts/FrauncesSoft72-LightItalic.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1712",
          color: "#f4efe4",
          fontFamily: "Fraunces",
          fontStyle: "italic",
          fontSize: 104,
          letterSpacing: -5,
          lineHeight: 1,
        }}
      >
        RC
        <div style={{ display: "flex", width: 112, height: 6, background: "#f4efe4", marginTop: 6 }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: italic, style: "italic", weight: 300 }] },
  );
}
