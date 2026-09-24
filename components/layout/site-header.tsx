import { portfolio } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07111f]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a
          className="w-fit text-sm font-semibold tracking-[-0.02em] text-white transition-colors hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          href="#top"
        >
          Ryan Cullen<span className="text-teal-300">.</span>
        </a>
        <div className="flex min-w-0 items-center gap-4">
          <nav aria-label="Primary navigation" className="max-w-full min-w-0 overflow-x-auto">
            <ul className="flex w-max items-center gap-4 text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase sm:gap-6">
            {portfolio.navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="transition-colors hover:text-teal-300 focus-visible:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
