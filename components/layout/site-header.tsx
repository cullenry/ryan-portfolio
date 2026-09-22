import { portfolio } from "@/data/portfolio";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-[#e5e7eb]/80 bg-[#f7f8fa]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a
          className="w-fit text-sm font-semibold tracking-[-0.02em] text-[#171a21] transition-colors hover:text-[#5b7cfa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b7cfa]"
          href="#top"
        >
          Ryan Cullen<span className="text-slate-400">.</span>
        </a>
        <nav aria-label="Primary navigation" className="max-w-full min-w-0 overflow-x-auto">
          <ul className="flex w-max items-center gap-4 text-[11px] font-semibold tracking-[0.12em] text-[#6b7280] uppercase sm:gap-6">
            {portfolio.navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="transition-colors hover:text-[#171a21] focus-visible:text-[#171a21] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b7cfa]"
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
