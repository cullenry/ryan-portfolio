import type { ProfileLink as ProfileLinkData } from "@/data/portfolio";

type ProfileLinkProps = {
  link: ProfileLinkData;
  variant?: "primary" | "secondary";
};

export function ProfileLink({ link, variant = "secondary" }: ProfileLinkProps) {
  const sharedClassName =
    "profile-link interactive-lift inline-flex min-h-11 items-center justify-center px-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b7cfa]";
  const variantClassName =
    variant === "primary"
      ? "profile-link--primary bg-[#171a21] text-white hover:bg-[#5b7cfa]"
      : "profile-link--secondary border border-[#d1d5db] bg-white/75 text-[#171a21] hover:border-[#5b7cfa] hover:text-[#5b7cfa]";

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
