"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

type Key = {
  id: string;
  note: string;
  label: string;
  frequency: number;
  keyboard: string;
};

const whiteKeys: Key[] = [
  { id: "c4", note: "C", label: "C", frequency: 261.63, keyboard: "a" },
  { id: "d4", note: "D", label: "D", frequency: 293.66, keyboard: "s" },
  { id: "e4", note: "E", label: "E", frequency: 329.63, keyboard: "d" },
  { id: "f4", note: "F", label: "F", frequency: 349.23, keyboard: "f" },
  { id: "g4", note: "G", label: "G", frequency: 392.0, keyboard: "g" },
  { id: "a4", note: "A", label: "A", frequency: 440.0, keyboard: "h" },
  { id: "b4", note: "B", label: "B", frequency: 493.88, keyboard: "j" },
  { id: "c5", note: "C", label: "High C", frequency: 523.25, keyboard: "k" },
];

// `after` is the index of the white key each black key sits to the right of.
const blackKeys: Array<Key & { after: number }> = [
  { id: "cs4", note: "C♯", label: "C sharp", frequency: 277.18, keyboard: "w", after: 0 },
  { id: "ds4", note: "D♯", label: "D sharp", frequency: 311.13, keyboard: "e", after: 1 },
  { id: "fs4", note: "F♯", label: "F sharp", frequency: 369.99, keyboard: "t", after: 3 },
  { id: "gs4", note: "G♯", label: "G sharp", frequency: 415.3, keyboard: "y", after: 4 },
  { id: "as4", note: "A♯", label: "A sharp", frequency: 466.16, keyboard: "u", after: 5 },
];

const keysByKeyboard = new Map([...whiteKeys, ...blackKeys].map((key) => [key.keyboard, key]));
const noteGlyphs = ["♪", "♫", "♩", "♬"];

type FloatingNote = {
  id: number;
  left: string;
  glyph: string;
};

function keyLeft(key: Key) {
  const whiteIndex = whiteKeys.indexOf(key);

  if (whiteIndex !== -1) {
    return `${((whiteIndex + 0.5) / whiteKeys.length) * 100}%`;
  }

  const black = blackKeys.find((candidate) => candidate.id === key.id);

  return `${(((black?.after ?? 0) + 1) / whiteKeys.length) * 100}%`;
}

/** A one-octave piano. Sound only ever starts from a tap, click or key press. */
export function MiniPiano({ className = "" }: { className?: string }) {
  const audioRef = useRef<AudioContext | null>(null);
  const noteIdRef = useRef(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [notes, setNotes] = useState<FloatingNote[]>([]);

  const play = (key: Key) => {
    setActiveKey(key.id);

    const id = noteIdRef.current++;
    setNotes((current) => [
      ...current.slice(-5),
      { id, left: keyLeft(key), glyph: noteGlyphs[id % noteGlyphs.length] },
    ]);
    window.setTimeout(() => {
      setNotes((current) => current.filter((note) => note.id !== id));
    }, 1000);

    if (typeof window.AudioContext !== "function") {
      return;
    }

    const context = (audioRef.current ??= new AudioContext());

    if (context.state === "suspended") {
      void context.resume();
    }

    const now = context.currentTime;
    const envelope = context.createGain();
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(0.2, now + 0.012);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    envelope.connect(context.destination);

    // A soft triangle tone with a couple of quiet overtones, roughly piano-ish.
    [
      { multiple: 1, level: 1, type: "triangle" as const },
      { multiple: 2, level: 0.22, type: "sine" as const },
      { multiple: 3, level: 0.07, type: "sine" as const },
    ].forEach(({ multiple, level, type }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = key.frequency * multiple;
      gain.gain.value = level;
      oscillator.connect(gain).connect(envelope);
      oscillator.start(now);
      oscillator.stop(now + 1.6);
    });
  };

  const release = () => setActiveKey(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = keysByKeyboard.get(event.key.toLowerCase());

    if (!key || event.repeat || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    event.preventDefault();
    play(key);
  };

  const keyProps = (key: Key) => ({
    "aria-label": key.label,
    "data-active": activeKey === key.id,
    onClick: (event: MouseEvent) => {
      // Keyboard activation (Enter / Space) arrives as a click with no pointer detail.
      if (event.detail === 0) {
        play(key);
        window.setTimeout(release, 160);
      }
    },
    onPointerDown: () => play(key),
    onPointerLeave: release,
    onPointerUp: release,
    onPointerCancel: release,
    type: "button" as const,
  });

  return (
    <div
      aria-label="A tiny playable piano. Keys A to K play the white notes."
      className={`piano ${className}`}
      onKeyDown={handleKeyDown}
      onKeyUp={release}
      role="group"
    >
      {whiteKeys.map((key) => (
        <button className="piano__white" key={key.id} {...keyProps(key)}>
          <span aria-hidden="true">{key.note}</span>
        </button>
      ))}
      {blackKeys.map((key) => (
        <button
          className="piano__black"
          key={key.id}
          style={{ left: keyLeft(key) }}
          {...keyProps(key)}
        />
      ))}
      {notes.map((note) => (
        <span aria-hidden="true" className="piano__note" key={note.id} style={{ left: note.left }}>
          {note.glyph}
        </span>
      ))}
    </div>
  );
}
