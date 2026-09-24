"use client";

import { useEffect, useRef, useState } from "react";

type ScrollTypewriterProps = {
  lines: string[];
};

export function ScrollTypewriter({ lines }: ScrollTypewriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const typedLines = lines.map((line) => `+ ${line}`);
  const totalCharacters = typedLines.reduce(
    (total, line) => total + line.length,
    0,
  );

  useEffect(() => {
    const element = containerRef.current;

    if (!element || started) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || characterCount >= totalCharacters) {
      return;
    }

    const timer = window.setInterval(() => {
      setCharacterCount((count) => Math.min(count + 1, totalCharacters));
    }, 18);

    return () => window.clearInterval(timer);
  }, [characterCount, started, totalCharacters]);

  return (
    <div className="scroll-typewriter" ref={containerRef}>
      {typedLines.map((line, index) => {
        const lineStart = typedLines
          .slice(0, index)
          .reduce((total, previousLine) => total + previousLine.length, 0);
        const visibleCharacters = Math.min(
          Math.max(characterCount - lineStart, 0),
          line.length,
        );
        const visibleText = line.slice(0, visibleCharacters);

        return (
          <p className="scroll-typewriter__line" key={line}>
            {visibleText.startsWith("+") && (
              <span className="text-teal-300">+</span>
            )}
            {visibleText.length > 1 && (
              <span>{visibleText.slice(1)}</span>
            )}
            {visibleCharacters < line.length &&
              characterCount >= lineStart &&
              characterCount < lineStart + line.length && (
              <span className="terminal-cursor" aria-hidden="true">▌</span>
            )}
          </p>
        );
      })}
    </div>
  );
}
