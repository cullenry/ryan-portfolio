import Link from "next/link";
import { DoorMark } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { portfolio } from "@/data/portfolio";

const navLinkClassName =
  "rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-ink/[0.06] hover:text-ink";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        href="#about"
      >
        Skip to the About section
      </a>
      <div className="mx-auto flex h-16 max-w-[76rem] items-center justify-between gap-3 px-5 sm:px-8">
        <a className="group flex items-center gap-2.5" href="#top">
          <DoorMark className="size-8 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="display text-lg font-semibold tracking-tight">
            Ryan Cullen<span className="text-tomato">.</span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-0.5 sm:gap-1">
              {portfolio.navigation.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith("/") ? (
                    <Link className={navLinkClassName} href={item.href}>
                      {item.label}
                    </Link>
                  ) : (
                    <a className={navLinkClassName} href={item.href}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <a
            className="hidden rounded-full bg-tomato px-4 py-2 text-sm font-semibold text-cream transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] min-[420px]:inline-flex"
            href="#contact"
          >
            Say hello
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
