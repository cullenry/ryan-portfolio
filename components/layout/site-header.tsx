import { portfolio } from "@/data/portfolio";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-[#f8f9fb]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a
          className="w-fit text-sm font-semibold tracking-[-0.02em] text-slate-950 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
          href="#top"
        >
          Ryan Cullen<span className="text-slate-400">.</span>
        </a>
        <nav aria-label="Primary navigation" className="max-w-full min-w-0 overflow-x-auto">
          <ul className="flex w-max items-center gap-4 text-sm text-slate-600 sm:gap-5">
            {portfolio.navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="transition-colors hover:text-slate-950 focus-visible:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
