import type { ProfileLink as ProfileLinkData } from "@/data/portfolio";

type ProfileLinkProps = {
  link: ProfileLinkData;
  variant?: "primary" | "secondary";
};

export function ProfileLink({ link, variant = "secondary" }: ProfileLinkProps) {
  const sharedClassName =
    "interactive-lift inline-flex min-h-11 items-center justify-center px-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300";
  const variantClassName =
    variant === "primary"
      ? "border border-violet-300/50 bg-violet-400/15 text-white shadow-[0_0_24px_rgba(139,92,246,0.18)] hover:border-violet-200 hover:bg-violet-400/25"
      : "border border-white/15 bg-white/[0.04] text-slate-200 hover:border-teal-300/60 hover:bg-teal-300/10 hover:text-teal-200";

  if (!link.href) {
    return (
      <span
        aria-disabled="true"
        className={`${sharedClassName} interactive-lift--disabled ${variantClassName} cursor-not-allowed opacity-50`}
        title={`${link.label} link has not been added yet`}
      >
        {link.label}
      </span>
    );
  }

  return (
    <a
      className={`${sharedClassName} ${variantClassName}`}
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {link.label}
    </a>
  );
}
