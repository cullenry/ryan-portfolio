"use client";

import { useEffect } from "react";

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
    <div aria-hidden="true" className="ambient-background" />
  );
}
