"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { portfolio } from "@/data/portfolio";
import { getTheme, setTheme } from "@/lib/theme";

type Command = {
  id: string;
  group: "Sections" | "Open" | "Actions";
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

export const OPEN_INDEX_EVENT = "ledger:open-index";
export const DRIVE_EVENT = "ledger:drive";

function goToSection(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  history.pushState(null, "", hash);
  target.scrollIntoView({ block: "start" });
  target.focus({ preventScroll: true });
}

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

/** The `/` command index: a small, keyboard-first way around the site. */
export function CommandIndex() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");
  const listId = useId();

  const commands = useMemo<Command[]>(() => {
    const external = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");

    return [
      ...portfolio.navigation.map((item) => ({
        id: `go-${item.href}`,
        group: "Sections" as const,
        label: item.label,
        hint: `p.${item.page}`,
        run: () => goToSection(item.href),
      })),
      { id: "go-activity", group: "Sections", label: "GitHub activity", hint: "p.05", keywords: "commits code", run: () => goToSection("#activity") },
      { id: "open-theoryprep", group: "Open", label: "Open TheoryPrep", hint: "theoryprep.ie ↗", keywords: "driving theory test", run: external(portfolio.links.theoryprep.href) },
      { id: "open-cv", group: "Open", label: "Read the CV", hint: "/cv", keywords: "resume curriculum vitae", run: () => router.push("/cv") },
      { id: "open-github", group: "Open", label: "GitHub", hint: "@cullenry ↗", keywords: "code repos", run: external(portfolio.links.github.href) },
      { id: "open-linkedin", group: "Open", label: "LinkedIn", hint: "↗", run: external(portfolio.links.linkedin.href) },
      { id: "email", group: "Actions", label: "Email Ryan", hint: portfolio.email, keywords: "contact mail", run: () => (window.location.href = portfolio.links.email.href) },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        keywords: "contact clipboard",
        run: () => {
          void navigator.clipboard?.writeText(portfolio.email);
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Switch edition",
        hint: "day / night",
        keywords: "theme dark light mode",
        run: () => setTheme(getTheme() === "dark" ? "light" : "dark"),
      },
      { id: "drive", group: "Actions", label: "Take a test drive", hint: "?", keywords: "car konami easter egg", run: () => window.dispatchEvent(new Event(DRIVE_EVENT)) },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint ?? ""} ${command.keywords ?? ""} ${command.group}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    const open = () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      setQuery("");
      setActive(0);
      dialog.showModal();
      inputRef.current?.focus();
    };

    const onKey = (event: globalThis.KeyboardEvent) => {
      const wantsIndex =
        (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) ||
        (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey));
      if (wantsIndex && !isTypingTarget(event.target)) {
        event.preventDefault();
        open();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_INDEX_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_INDEX_EVENT, open);
    };
  }, []);

  const close = () => dialogRef.current?.close();

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    close();
    if (command.id === "copy-email") setNotice(`Copied ${portfolio.email}`);
    // Let the dialog close (and return focus) before navigating.
    requestAnimationFrame(command.run);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((activeIndex + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((activeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommand(results[activeIndex]);
    }
  };

  const groups = [...new Set(results.map((command) => command.group))];

  return (
    <>
      <dialog
        aria-label="Site index"
        className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] border border-ink bg-paper p-0 text-ink shadow-[6px_6px_0_var(--ink)] backdrop:bg-ink/40 backdrop:backdrop-blur-[2px]"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        ref={dialogRef}
      >
        <div className="flex items-center justify-between border-b border-ink px-4 py-2">
          <p className="kicker">Index</p>
          <p className="meta">
            <kbd className="font-mono">↑↓</kbd> move · <kbd className="font-mono">↵</kbd> open · <kbd className="font-mono">esc</kbd> close
          </p>
        </div>
        <label className="sr-only" htmlFor={`${listId}-input`}>
          Search sections and actions
        </label>
        <div className="flex items-center gap-3 border-b border-rule px-4">
          <span aria-hidden="true" className="font-mono text-press">
            /
          </span>
          <input
            aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined}
            aria-autocomplete="list"
            aria-controls={`${listId}-list`}
            aria-expanded="true"
            autoComplete="off"
            className="h-14 min-w-0 flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-ink-3"
            id={`${listId}-input`}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Type a section or action…"
            ref={inputRef}
            role="combobox"
            spellCheck={false}
            value={query}
          />
        </div>
        <div aria-label="Results" className="max-h-[50vh] overflow-y-auto py-2" id={`${listId}-list`} role="listbox">
          {groups.map((group) => (
            <div aria-labelledby={`${listId}-g-${group}`} key={group} role="group">
              <p className="px-5 pt-2 pb-1 font-sans text-[0.65rem] font-semibold tracking-[0.12em] text-ink-3 uppercase" id={`${listId}-g-${group}`} role="presentation">
                {group}
              </p>
              {results.map((command, index) => {
                if (command.group !== group) return null;
                const selected = index === activeIndex;
                return (
                  <div
                    aria-selected={selected}
                    className={`mx-2 flex cursor-pointer items-baseline justify-between gap-4 px-3 py-2.5 ${selected ? "bg-ink text-on-ink" : "text-ink"}`}
                    id={`${listId}-${command.id}`}
                    key={command.id}
                    onClick={() => runCommand(command)}
                    onMouseMove={() => setActive(index)}
                    role="option"
                  >
                    <span className="font-serif text-lg leading-tight">{command.label}</span>
                    {command.hint && (
                      <span className={`font-mono text-xs ${selected ? "text-on-ink/80" : "text-ink-3"}`}>{command.hint}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {results.length === 0 && <p className="px-5 py-6 font-serif text-ink-2 italic">Nothing filed under “{query}”.</p>}
      </dialog>
      <p aria-live="polite" className="sr-only">
        {notice}
      </p>
    </>
  );
}

export function IndexButton({ className = "" }: { className?: string }) {
  return (
    <button
      aria-keyshortcuts="/"
      className={`group inline-flex min-h-11 items-center gap-2 font-sans text-[0.8rem] font-semibold text-ink-2 transition-colors hover:text-press ${className}`}
      onClick={() => window.dispatchEvent(new Event(OPEN_INDEX_EVENT))}
      type="button"
    >
      <span className="[font-stretch:80%]">Index</span>
      <kbd className="grid size-5 place-items-center border border-ink-3 font-mono text-[0.7rem] leading-none text-ink group-hover:border-press group-hover:text-press">
        /
      </kbd>
    </button>
  );
}
