import type { ProfileLink as ProfileLinkData } from "@/data/portfolio";

type ProfileLinkProps = {
  link: ProfileLinkData;
  variant?: "primary" | "secondary";
};

export function ProfileLink({ link, variant = "secondary" }: ProfileLinkProps) {
  const sharedClassName =
    "interactive-lift inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950";
  const variantClassName =
    variant === "primary"
      ? "bg-slate-950 text-white hover:bg-slate-700"
      : "border border-slate-300 bg-white text-slate-800 hover:border-slate-500 hover:text-slate-950";

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
