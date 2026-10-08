// Editorial illustrations for projects without screenshots. Rendered on the server
// as inline SVG, coloured with theme tokens, and captioned as illustrations so
// nobody mistakes them for real results.

/** Deterministic pseudo-random walk so the chart is identical on every render. */
function walk(count: number, seed: number) {
  let value = 50;
  let state = seed;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
  return Array.from({ length: count }, () => {
    const open = value;
    value = Math.max(18, Math.min(86, value + (random() - 0.47) * 9));
    const close = value;
    const high = Math.max(open, close) + random() * 4;
    const low = Math.min(open, close) - random() * 4;
    return { open, close, high, low };
  });
}

export function TradingArt() {
  const candles = walk(40, 11);
  const width = 340;
  const height = 180;
  const step = width / candles.length;
  const lo = Math.min(...candles.map((candle) => candle.low)) - 2;
  const hi = Math.max(...candles.map((candle) => candle.high)) + 2;
  const y = (value: number) => height - ((value - lo) / (hi - lo)) * height;

  const average = (period: number) =>
    candles
      .map((_, index) => {
        if (index < period - 1) return null;
        const slice = candles.slice(index - period + 1, index + 1);
        const mean = slice.reduce((sum, candle) => sum + candle.close, 0) / period;
        return `${index * step + step / 2},${y(mean)}`;
      })
      .filter(Boolean)
      .join(" ");

  return (
    <svg aria-hidden="true" className="h-auto w-full" viewBox={`0 0 ${width} ${height + 24}`}>
      {[0.25, 0.5, 0.75].map((line) => (
        <line key={line} stroke="var(--rule-soft)" strokeDasharray="2 4" x1="0" x2={width} y1={height * line} y2={height * line} />
      ))}
      {candles.map((candle, index) => {
        const x = index * step + step / 2;
        const up = candle.close >= candle.open;
        const colour = up ? "var(--market)" : "var(--press)";
        return (
          <g key={index}>
            <line stroke={colour} strokeWidth="1" x1={x} x2={x} y1={y(candle.high)} y2={y(candle.low)} />
            <rect
              fill={up ? "var(--paper)" : colour}
              height={Math.max(1.5, Math.abs(y(candle.open) - y(candle.close)))}
              stroke={colour}
              strokeWidth="1"
              width={step * 0.56}
              x={x - step * 0.28}
              y={Math.min(y(candle.open), y(candle.close))}
            />
          </g>
        );
      })}
      <polyline fill="none" points={average(5)} stroke="var(--ink)" strokeWidth="1.5" />
      <polyline fill="none" points={average(12)} stroke="var(--ink-3)" strokeDasharray="4 3" strokeWidth="1.25" />
      <text className="fill-ink-3 font-mono" fontSize="7" x="0" y={height + 16}>
        SMA 5 ───   SMA 12 - - -
      </text>
    </svg>
  );
}

export function NetflixArt() {
  const bars = [62, 88, 47, 71, 95, 54, 80, 38, 66];
  return (
    <svg aria-hidden="true" className="h-auto w-full" viewBox="0 0 300 170">
      <line stroke="var(--ink)" x1="0" x2="300" y1="150" y2="150" />
      {bars.map((bar, index) => (
        <rect
          fill={index === 4 ? "var(--press)" : "var(--ink)"}
          fillOpacity={index === 4 ? 1 : 0.18 + index * 0.06}
          height={bar * 1.4}
          key={index}
          rx="2"
          width="24"
          x={8 + index * 32}
          y={150 - bar * 1.4}
        />
      ))}
      <text className="fill-ink-3 font-mono" fontSize="9" x="0" y="166">
        titles ▸ by year · type · genre · country
      </text>
    </svg>
  );
}

export function ServerArt() {
  const lines = [
    ["$", "gcloud compute ssh mc-server"],
    ["$", "./run.sh --nogui"],
    ["[INFO]", "Loading NeoForge for MC 1.21.1"],
    ["[INFO]", "Preparing level \"world\""],
    ["[INFO]", "Done! For help, type \"help\""],
    [">", "list"],
  ];
  return (
    <div aria-hidden="true" className="border border-ink bg-ink p-4 font-mono text-[0.72rem] leading-6 text-on-ink sm:text-xs">
      <div className="mb-2 flex items-center justify-between border-b border-on-ink/20 pb-2 text-on-ink/70">
        <span>google cloud · linux vm</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--heat-3)]" /> online
        </span>
      </div>
      {lines.map(([prefix, text], index) => (
        <p className="truncate" key={index}>
          <span className="text-on-ink/60">{prefix}</span> {text}
        </p>
      ))}
    </div>
  );
}

export function PortfolioArt() {
  return (
    <svg aria-hidden="true" className="h-auto w-full" viewBox="0 0 300 150">
      <rect fill="var(--paper-2)" height="150" stroke="var(--ink)" width="300" />
      <rect fill="var(--ink)" height="8" width="300" />
      <text fill="var(--ink)" fontFamily="var(--font-serif)" fontSize="34" x="14" y="52">
        Ryan <tspan fontStyle="italic">Cullen</tspan>
      </text>
      <line stroke="var(--ink)" strokeWidth="2" x1="14" x2="286" y1="62" y2="62" />
      <line stroke="var(--ink)" x1="14" x2="286" y1="65" y2="65" />
      <rect fill="var(--ink)" fillOpacity=".12" height="56" width="170" x="14" y="76" />
      {[78, 88, 98, 108, 118].map((lineY) => (
        <line key={lineY} stroke="var(--ink-3)" x1="196" x2="286" y1={lineY} y2={lineY} />
      ))}
    </svg>
  );
}
