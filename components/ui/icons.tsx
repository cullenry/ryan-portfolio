import type { ReactNode, SVGProps } from "react";
import type { Interest } from "@/data/portfolio";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
    </Svg>
  );
}

export function MarketsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3.5v17M12 6v12M18 2.5v15" />
      <rect fill="currentColor" height="7" rx="0.6" width="3.6" x="4.2" y="8" />
      <rect height="6" rx="0.6" width="3.6" x="10.2" y="9" />
      <rect fill="currentColor" height="8" rx="0.6" width="3.6" x="16.2" y="5" />
    </Svg>
  );
}

export function FootballIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m12 7.6 3.6 2.6-1.4 4.2H9.8l-1.4-4.2Z" fill="currentColor" />
      <path d="M12 3v4.6M15.6 10.2l4.6-1.6M14.2 14.4l2.8 4M9.8 14.4l-2.8 4M8.4 10.2 3.8 8.6" />
    </Svg>
  );
}

export function ReadingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 5.5c3-1.4 6-1.3 9 .9 3-2.2 6-2.3 9-.9V19c-3-1.4-6-1.3-9 .9-3-2.2-6-2.3-9-.9Z" />
      <path d="M12 6.4v13.5" />
    </Svg>
  );
}

export function PianoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect height="14" rx="1.6" width="18" x="3" y="5" />
      <path d="M7.5 13v6M12 13v6M16.5 13v6" />
      <path d="M6 5h3v8H6zM10.5 5h3v8h-3zM15 5h3v8h-3z" fill="currentColor" />
    </Svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect height="12" rx="2.5" width="12" x="8.5" y="8.5" />
      <path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" />
    </Svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.5 13.4A8.5 8.5 0 0 1 10.6 3.5a8.5 8.5 0 1 0 9.9 9.9Z" />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s6.5-6.1 6.5-11.2a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </Svg>
  );
}

const interestIcons = {
  code: CodeIcon,
  markets: MarketsIcon,
  football: FootballIcon,
  reading: ReadingIcon,
  piano: PianoIcon,
} satisfies Record<Interest["icon"], (props: IconProps) => ReactNode>;

export function InterestIcon({ name, ...props }: IconProps & { name: Interest["icon"] }) {
  const Icon = interestIcons[name];

  return <Icon {...props} />;
}

/** The little door used as the logo mark and favicon. */
export function DoorMark(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" {...props}>
      <rect fill="var(--tomato)" height="64" rx="16" width="64" />
      <path d="M18 56V29a14 14 0 0 1 28 0v27Z" fill="var(--cream)" />
      <path d="M23 29a9 9 0 0 1 18 0Z" fill="var(--marigold)" />
      <path d="M32 20.5V29M25.6 23.2 32 29M38.4 23.2 32 29" stroke="var(--cream)" strokeWidth="1.6" />
      <rect fill="var(--cobalt)" height="24" rx="1" width="18" x="23" y="32" />
      <circle cx="37.5" cy="44" fill="var(--marigold)" r="1.8" />
    </svg>
  );
}
