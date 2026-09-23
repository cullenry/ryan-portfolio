import { ArrowUpIcon } from "@/components/ui/icons";
import { portfolio } from "@/data/portfolio";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-3 px-5 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} {portfolio.name} · Made in Dublin, one door at a time.
        </p>
        <a className="inline-flex w-fit items-center gap-1.5 font-semibold transition-colors hover:text-tomato-ink" href="#top">
          Back to the top
          <ArrowUpIcon className="size-4" />
        </a>
      </div>
    </footer>
  );
}
