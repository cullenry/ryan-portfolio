"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const resetRef = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }

    setCopied(true);
    window.clearTimeout(resetRef.current);
    resetRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className={className} onClick={copy} type="button">
      {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      <span>{copied ? "Copied!" : "Copy email"}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to your clipboard` : ""}
      </span>
    </button>
  );
}
