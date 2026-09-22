"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Orb = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  popping?: boolean;
};

const ORB_COUNT = 2;

function createOrb(id: number, existing: Orb[] = []): Orb {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const x = Math.random() > 0.5
      ? 4 + Math.random() * 5
      : 91 + Math.random() * 5;
    const y = 20 + Math.random() * 68;
    const size = 14 + Math.random() * 7;
    const overlapsOrb = existing.some(
      (orb) =>
        Math.abs(orb.x - x) < 8 && Math.abs(orb.y - y) < 8,
    );

    if (!overlapsOrb) {
      return {
        id,
        x,
        y,
        size,
        delay: Math.random() * -4,
      };
    }
  }

  return {
    id,
    x: Math.random() > 0.5 ? 7 : 93,
    y: 50 + Math.random() * 30,
    size: 16,
    delay: 0,
  };
}

function AmbientOrbGame() {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 701px)",
    );

    if (!mediaQuery.matches) {
      return;
    }

    let nextId = 0;

    const spawnOrb = () => {
      setOrbs((currentOrbs) => {
        if (currentOrbs.length >= 3) {
          return currentOrbs;
        }

        const orb = createOrb(nextId, currentOrbs);
        nextId += 1;
        return [...currentOrbs, orb];
      });
    };

    const initialTimer = window.setTimeout(() => {
      spawnOrb();
      spawnOrb();
    }, 900);

    return () => {
      window.clearTimeout(initialTimer);
    };
  }, []);

  const popOrb = (id: number) => {
    setOrbs((currentOrbs) =>
      currentOrbs.map((orb) =>
        orb.id === id ? { ...orb, popping: true } : orb,
      ),
    );

    window.setTimeout(() => {
      setOrbs((currentOrbs) => currentOrbs.filter((orb) => orb.id !== id));
      window.setTimeout(() => {
        setOrbs((currentOrbs) => {
          if (currentOrbs.length >= ORB_COUNT) {
            return currentOrbs;
          }

          const orb = createOrb(Date.now(), currentOrbs);
          return [...currentOrbs, orb];
        });
      }, 500);
    }, 420);
  };

  return (
    <div className="ambient-orb-layer">
      {orbs.map((orb) => (
        <button
          aria-label="Pop ambient orb"
          className={`ambient-orb${orb.popping ? " ambient-orb--popping" : ""}`}
          key={orb.id}
          onClick={() => popOrb(orb.id)}
          style={
            {
              "--orb-delay": `${orb.delay}s`,
              "--orb-size": `${orb.size}px`,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
            } as CSSProperties
          }
          type="button"
        >
          <span className="ambient-orb__core" />
          <span className="ambient-orb__ring" />
        </button>
      ))}
    </div>
  );
}

export function AmbientBackground() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    if (!mediaQuery.matches) {
      return;
    }

    let targetX = 50;
    let targetY = 12;
    let currentX = targetX;
    let currentY = targetY;
    let currentOpacity = 0.68;
    let frameId = 0;
    let scrollFrameId = 0;

    const updatePointer = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = Math.min((event.clientY / window.innerHeight) * 100, 72);
    };

    const updateScroll = () => {
      scrollFrameId = 0;
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(window.scrollY / scrollRange, 1);
      const targetOpacity = 0.68 - scrollProgress * 0.28;

      currentOpacity += (targetOpacity - currentOpacity) * 0.08;
      document.documentElement.style.setProperty(
        "--ambient-opacity",
        currentOpacity.toFixed(3),
      );
    };

    const requestScrollUpdate = () => {
      if (scrollFrameId === 0) {
        scrollFrameId = window.requestAnimationFrame(updateScroll);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;
      document.documentElement.style.setProperty(
        "--ambient-x",
        `${currentX}%`,
      );
      document.documentElement.style.setProperty(
        "--ambient-y",
        `${currentY}%`,
      );
      requestScrollUpdate();
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    frameId = window.requestAnimationFrame(animate);
    requestScrollUpdate();

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", requestScrollUpdate);
      window.cancelAnimationFrame(frameId);
      if (scrollFrameId !== 0) {
        window.cancelAnimationFrame(scrollFrameId);
      }
      document.documentElement.style.removeProperty("--ambient-x");
      document.documentElement.style.removeProperty("--ambient-y");
      document.documentElement.style.removeProperty("--ambient-opacity");
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="ambient-background" />
      <AmbientOrbGame />
    </>
  );
}
