"use client";

import { useEffect, useState } from "react";

export function CopyButton({ text, label = "Copy address" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      className="btn btn-line"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          window.prompt("Copy this address:", text);
        }
      }}
      type="button"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : label}</span>
    </button>
  );
}
