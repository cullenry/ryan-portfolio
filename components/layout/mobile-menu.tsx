"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { NavigationItem } from "@/data/portfolio";

export function MobileMenu({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      className="lg:hidden"
      onBlur={(event) => {
        // Only when focus moves somewhere else; Safari doesn't focus tapped links.
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      ref={rootRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="inline-flex min-h-11 items-center gap-2 font-sans text-[0.8rem] font-semibold text-ink"
        onClick={() => setOpen((value) => !value)}
        ref={buttonRef}
        type="button"
      >
        <span className="[font-stretch:80%]">Sections</span>
        <svg aria-hidden="true" className={`size-3 transition-transform duration-200 ${open ? "rotate-45" : ""}`} viewBox="0 0 12 12">
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <nav
        aria-label="Sections"
        className={`absolute inset-x-0 top-full border-b-[3px] border-ink bg-paper shadow-[0_12px_24px_-12px_rgb(0_0_0/0.25)] ${open ? "block" : "hidden"}`}
        id={panelId}
      >
        <ul className="wrap grid py-2">
          {items.map((item) => (
            <li className="border-b border-rule last:border-0" key={item.href}>
              <a
                className="flex min-h-12 items-baseline justify-between gap-4 py-3 font-serif text-2xl hover:text-press"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <span className="meta">p.{item.page}</span>
              </a>
            </li>
          ))}
          <li>
            <Link className="flex min-h-12 items-baseline justify-between gap-4 py-3 font-serif text-2xl italic hover:text-press" href="/cv">
              Curriculum vitae
              <span className="meta">/cv</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
