"use client";

import { useState, type CSSProperties } from "react";
import { DoorArt } from "@/components/ui/door";
import { InterestIcon } from "@/components/ui/icons";
import { portfolio } from "@/data/portfolio";

const doorColors = [
  "var(--tomato)",
  "var(--marigold)",
  "var(--cobalt)",
  "var(--clover)",
  "var(--plum)",
];

export function DoorStreet({ className = "" }: { className?: string }) {
  const [openDoors, setOpenDoors] = useState<ReadonlySet<number>>(() => new Set());

  const toggleDoor = (index: number) => {
    setOpenDoors((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  return (
    <div className={className}>
      <div className="street__scroller">
        <ul aria-label="Behind the doors" className="street__doors">
          {portfolio.interests.map((interest, index) => {
            const number = (index + 1).toString(2);
            const isOpen = openDoors.has(index);

            return (
              <li
                className={`door${index === 2 ? " door--hint" : ""}`}
                data-open={isOpen}
                key={interest.label}
                style={{ "--door": doorColors[index % doorColors.length] } as CSSProperties}
              >
                <button
                  aria-pressed={isOpen}
                  className="door__button"
                  onClick={() => toggleDoor(index)}
                  type="button"
                >
                  <span className="sr-only">Door number {number}: </span>
                  <DoorArt number={number}>
                    <InterestIcon name={interest.icon} />
                    <span className="door__label">{interest.label}</span>
                  </DoorArt>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-hidden="true" className="street__pavement" />

      <p className="mx-auto mt-4 max-w-[76rem] px-5 text-center font-hand text-xl leading-snug text-ink-soft sm:px-8 sm:text-2xl">
        Knock knock! Every door opens.{" "}
        <span className="whitespace-nowrap">(House numbers in binary, obviously.)</span>
      </p>
    </div>
  );
}
