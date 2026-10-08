/**
 * Weekly-totals sparkline (dataviz stat-tile trend): history in the de-emphasis ink,
 * the current week marked in the accent. Decorative; the figure beside it carries the value.
 */
export function Sparkline({ values, className = "" }: { values: number[]; className?: string }) {
  if (values.length < 2) return null;

  const width = 144;
  const height = 56;
  const pad = 4;
  const max = Math.max(...values, 1);
  const x = (index: number) => pad + (index / (values.length - 1)) * (width - pad * 2);
  const y = (value: number) => height - pad - (value / max) * (height - pad * 2);
  const points = values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(" ");
  const last = values.length - 1;

  return (
    <svg aria-hidden="true" className={className} preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
      <line stroke="var(--rule)" strokeWidth="1" vectorEffect="non-scaling-stroke" x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} />
      <polyline
        fill="none"
        points={points}
        stroke="var(--ink-3)"
        strokeLinejoin="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={x(last)} cy={y(values[last])} fill="var(--market)" r="3.5" stroke="var(--paper)" strokeWidth="2" />
    </svg>
  );
}
