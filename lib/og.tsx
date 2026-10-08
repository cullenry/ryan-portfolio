import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "assets/fonts");

async function loadFonts() {
  const [serif, serifItalic, sans, mono] = await Promise.all([
    readFile(join(fontDir, "FrauncesSoft72-Regular.ttf")),
    readFile(join(fontDir, "FrauncesSoft72-LightItalic.ttf")),
    readFile(join(fontDir, "InstrumentSans-SemiBold.ttf")),
    readFile(join(fontDir, "JetBrainsMono-Medium.ttf")),
  ]);
  return [
    { name: "Fraunces", data: serif, style: "normal" as const, weight: 400 as const },
    { name: "Fraunces", data: serifItalic, style: "italic" as const, weight: 300 as const },
    { name: "Instrument Sans", data: sans, style: "normal" as const, weight: 600 as const },
    { name: "JetBrains Mono", data: mono, style: "normal" as const, weight: 500 as const },
  ];
}

const paper = "#f4efe4";
const ink = "#1a1712";
const ink2 = "#4a443a";
const press = "#b3261e";

/** The social card: a front page in miniature. */
export async function renderOgImage({ kicker, footnote }: { kicker: string; footnote: string }) {
  const ticker = ["TPREP 805 questions", "MOCK 40 Q · 45 MIN", "TCD YR 2", "NOW BUILDING theoryprep.ie"];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: paper, color: ink }}>
        <div style={{ display: "flex", background: ink, color: paper, fontFamily: "JetBrains Mono", fontSize: 18, padding: "13px 56px", gap: 44 }}>
          {ticker.map((item) => (
            <span key={item} style={{ flexShrink: 0 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "34px 56px 0", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "JetBrains Mono", fontSize: 18, color: ink2, letterSpacing: 1 }}>
            <span>VOL. II · DUBLIN EDITION</span>
            <span>{kicker.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", height: 2, background: ink, marginTop: 12 }} />
          <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Fraunces", fontSize: 208, lineHeight: 1, letterSpacing: -8, marginTop: 6 }}>
            <span>Ryan</span>
            <span style={{ fontStyle: "italic", fontWeight: 300, marginLeft: 36 }}>Cullen</span>
          </div>
          <div style={{ display: "flex", height: 5, background: ink, marginTop: 30 }} />
          <div style={{ display: "flex", height: 1.5, background: ink, marginTop: 3 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 30 }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Instrument Sans", fontSize: 30 }}>
              <span>Computer Science & Business</span>
              <span style={{ color: ink2 }}>Trinity College Dublin</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", width: 16, height: 16, borderRadius: 16, background: press }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "Instrument Sans", fontSize: 18, letterSpacing: 3, color: press, lineHeight: 1.2 }}>NOW BUILDING</span>
                <span style={{ fontFamily: "Fraunces", fontSize: 44, lineHeight: 1.15, marginTop: 4 }}>TheoryPrep</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "auto", marginBottom: 26, fontFamily: "Fraunces", fontStyle: "italic", fontWeight: 300, fontSize: 24, color: ink2 }}>
            {footnote}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
