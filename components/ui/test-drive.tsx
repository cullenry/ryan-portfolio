"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DRIVE_EVENT } from "@/components/ui/command-index";

const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/**
 * Easter egg: the Konami code (or "Take a test drive" in the index) sends the
 * TheoryPrep car across the bottom of the page. With reduced motion it stays parked
 * and just honks.
 */
export function TestDrive() {
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let position = 0;

    const drive = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setMessage(reduce ? "Beep beep. The car stayed parked because you prefer reduced motion." : "Beep beep. Mirror, signal, manoeuvre.");
      if (!reduce) setRun((value) => value + 1);
    };

    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === konami[position] ? position + 1 : key === konami[0] ? 1 : 0;
      if (position === konami.length) {
        position = 0;
        drive();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(DRIVE_EVENT, drive);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(DRIVE_EVENT, drive);
    };
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  return (
    <>
      {run > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-2 left-0 z-50 w-[clamp(9rem,22vw,15rem)] animate-[test-drive_3.2s_cubic-bezier(.45,.05,.55,.95)_forwards]"
          key={run}
        >
          <Image alt="" height={494} src="/projects/theoryprep-mascot.webp" width={900} />
        </div>
      )}
      <p aria-live="polite" className={`fixed right-4 bottom-4 z-50 max-w-xs border border-ink bg-paper px-4 py-3 font-sans text-sm shadow-[4px_4px_0_var(--ink)] transition-opacity ${message ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        {message}
      </p>
    </>
  );
}
