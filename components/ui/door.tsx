import type { ReactNode } from "react";

// End points of the glazing bars on a 100 × 50 half-circle, every 22.5°.
const RAYS = [
  [96.19, 30.87],
  [85.36, 14.64],
  [69.13, 3.81],
  [50, 0],
  [30.87, 3.81],
  [14.64, 14.64],
  [3.81, 30.87],
] as const;

/** The sunburst glazing of a Georgian fanlight. Stretches to fill its box. */
export function FanlightBars({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} preserveAspectRatio="none" viewBox="0 0 100 50">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        {RAYS.map(([x, y]) => (
          <line key={`${x}-${y}`} vectorEffect="non-scaling-stroke" x1="50" x2={x} y1="50" y2={y} />
        ))}
        <path d="M13 50a37 37 0 0 1 74 0" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

type DoorArtProps = {
  number: string;
  children?: ReactNode;
};

/**
 * A painted Georgian door: doorcase, fanlight, a leaf that swings open and
 * whatever is waiting behind it. Colour comes from the `--door` custom property.
 */
export function DoorArt({ number, children }: DoorArtProps) {
  return (
    <>
      <span className="door__case">
        <span aria-hidden="true" className="door__fanlight">
          <FanlightBars />
          <span className="door__hub">{number}</span>
        </span>
        <span className="door__opening">
          <span className="door__inside">{children}</span>
          <span aria-hidden="true" className="door__leaf">
            {Array.from({ length: 6 }, (_, panel) => (
              <span className="door__panel" key={panel} />
            ))}
            <span className="door__knocker" />
            <span className="door__letterbox" />
            <span className="door__knob" />
          </span>
        </span>
      </span>
      <span aria-hidden="true" className="door__steps" />
    </>
  );
}
