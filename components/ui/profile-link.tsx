import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { ProfileLink as ProfileLinkData } from "@/data/portfolio";

type ProfileLinkProps = {
  link: ProfileLinkData;
  variant?: "primary" | "secondary";
};

export function ProfileLink({ link, variant = "secondary" }: ProfileLinkProps) {
  const sharedClassName =
    "group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border-[1.5px] border-ink px-5 text-sm font-semibold transition-[translate,box-shadow,background-color,color] duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] active:translate-y-0 active:shadow-none motion-reduce:transition-none";
  const variantClassName =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-cobalt hover:text-cream"
      : "bg-card text-ink hover:bg-marigold hover:text-night";

  if (!link.href) {
    return (
      <span
        aria-disabled="true"
        className={`${sharedClassName} ${variantClassName} pointer-events-none opacity-50`}
        title={`${link.label} link has not been added yet`}
      >
        {link.label}
      </span>
    );
  }

  if (!link.external) {
    return (
      <Link className={`${sharedClassName} ${variantClassName}`} href={link.href}>
        {link.label}
      </Link>
    );
  }

  return (
    <a className={`${sharedClassName} ${variantClassName}`} href={link.href} rel="noreferrer" target="_blank">
      {link.label}
      <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
