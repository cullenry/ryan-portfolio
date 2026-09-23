"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

const dublinClock = new Intl.DateTimeFormat("en-IE", {
  timeZone: "Europe/Dublin",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function subscribe(onTick: () => void) {
  const timer = window.setInterval(onTick, 15_000);

  return () => window.clearInterval(timer);
}

const getTime = () => dublinClock.format(new Date());
const getServerTime = () => "";

/**
 * Live local time in Dublin. The server can't know the visitor's "now", so it
 * renders an invisible placeholder of the same size and the client fills it in.
 */
export function DublinTime({ className = "" }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  const hour = Number(time.slice(0, 2));
  const isDaytime = !time || (hour >= 7 && hour < 20);
  const Icon = isDaytime ? SunIcon : MoonIcon;

  return (
    <p aria-hidden={!time} className={`${time ? "" : "invisible"} ${className}`}>
      <Icon className="size-[1.1em] shrink-0" />
      <span>
        It&apos;s <time className="font-semibold tabular-nums">{time || "00:00"}</time> in Dublin right now
      </span>
    </p>
  );
}
