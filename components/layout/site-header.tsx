import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { IndexButton } from "@/components/ui/command-index";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { portfolio } from "@/data/portfolio";

export function SiteHeader({ home = true }: { home?: boolean }) {
  const items = portfolio.navigation.filter((item) => item.href !== "#top");

  return (
    <header className="no-print sticky top-0 z-40 border-b border-ink bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/85">
      <div className="wrap flex min-h-14 items-center justify-between gap-4">
        <Link
          className="group flex items-center gap-2.5"
          href={home ? "#top" : "/"}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center bg-ink font-serif text-[0.95rem] leading-none text-on-ink italic transition-colors group-hover:bg-press"
          >
            RC
          </span>
          <span className="sr-only font-serif text-lg leading-none italic sm:not-sr-only">The Cullen Ledger</span>
        </Link>

        {home && (
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 font-sans text-[0.8rem] font-semibold [font-stretch:80%]">
              {items.map((item) => (
                <li key={item.href}>
                  <a className="inline-flex min-h-11 items-center px-2.5 text-ink-2 transition-colors hover:text-press" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link className="ml-1 inline-flex min-h-11 items-center px-2.5 text-ink transition-colors hover:text-press" href="/cv">
                  CV
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex items-center gap-3 sm:gap-5">
          <IndexButton className="hidden sm:inline-flex" />
          <ThemeToggle />
          {home ? (
            <MobileMenu items={items} />
          ) : (
            <Link className="inline-flex min-h-11 items-center font-sans text-[0.8rem] font-semibold hover:text-press" href="/">
              ← Front page
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
