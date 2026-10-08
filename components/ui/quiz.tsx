"use client";

import { useId, useRef, useState } from "react";
import type { QuizQuestion } from "@/data/portfolio";

const letters = ["A", "B", "C", "D"];

/** "Try a question": a four-question taster styled after TheoryPrep's practice screen. */
export function Quiz({ questions, ctaHref }: { questions: QuizQuestion[]; ctaHref: string }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  const question = questions[index];
  const answered = picked !== null;
  const correct = picked === question.answer;

  const choose = (option: number) => {
    if (answered) return;
    setPicked(option);
    if (option === question.answer) setScore((value) => value + 1);
  };

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setPicked(null);
    }
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  return (
    <div className="rounded-[14px] border border-[var(--tp-line)] bg-[var(--tp-card)] p-5 font-sans shadow-[0_1px_2px_#1a36240d,0_10px_30px_#1a36241a] sm:p-7">
      <div className="flex items-center justify-between gap-4 text-sm text-[var(--tp-muted)]">
        <p className="font-semibold text-[var(--tp-green)]">Try a question</p>
        <p className="tnum" aria-live="off">
          {finished ? "Done" : `${index + 1} of ${questions.length}`}
        </p>
      </div>
      <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--tp-green-soft)]">
        <div
          className="h-full rounded-full bg-[var(--tp-green)] transition-[width] duration-500"
          style={{ width: `${((finished ? questions.length : index + (answered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {finished ? (
        <div className="py-6">
          <h4 className="text-2xl leading-tight font-semibold outline-none" ref={headingRef} tabIndex={-1}>
            You got {score} out of {questions.length}.
          </h4>
          <p className="mt-2 text-[var(--tp-muted)]">
            {score === questions.length ? "Clean sheet. You'd sail through." : "The real test has 40 of these, and you need 35."} TheoryPrep has 805 more.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--tp-red)] px-5 font-semibold text-white transition-colors hover:bg-[var(--tp-red-dark)] dark:text-[#17231d]"
              href={ctaHref}
              rel="noreferrer"
              target="_blank"
            >
              Keep practising on TheoryPrep <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button
              className="inline-flex min-h-11 items-center rounded-lg border border-[var(--tp-line)] px-5 font-semibold transition-colors hover:border-[var(--tp-green)] hover:text-[var(--tp-green)]"
              onClick={restart}
              type="button"
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-5 text-xs font-semibold tracking-[0.08em] text-[var(--tp-muted)] uppercase">{question.topic}</p>
          <h4
            className="mt-1.5 text-xl leading-snug font-semibold outline-none sm:text-2xl"
            id={`${id}-q`}
            ref={headingRef}
            tabIndex={-1}
          >
            {question.prompt}
          </h4>
          <ul aria-labelledby={`${id}-q`} className="mt-5 grid gap-2.5">
            {question.options.map((option, optionIndex) => {
              const isAnswer = optionIndex === question.answer;
              const isPicked = optionIndex === picked;
              const state = !answered ? "idle" : isAnswer ? "correct" : isPicked ? "wrong" : "muted";

              return (
                <li key={option}>
                  <button
                    aria-disabled={answered}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left transition-[background-color,border-color,transform] duration-150 active:scale-[0.985] ${
                      state === "idle"
                        ? "border-[var(--tp-line)] bg-[var(--tp-card)] hover:border-[var(--tp-green)] hover:bg-[var(--tp-green-soft)]"
                        : state === "correct"
                          ? "border-[var(--tp-green)] bg-[var(--tp-green-soft)] text-[var(--tp-green-dark)]"
                          : state === "wrong"
                            ? "border-[var(--tp-red)] bg-[color-mix(in_oklab,var(--tp-red)_10%,var(--tp-card))] text-[var(--tp-red-dark)]"
                            : "border-[var(--tp-line)] opacity-70"
                    }`}
                    onClick={() => choose(optionIndex)}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-current/25 text-sm font-semibold"
                    >
                      {letters[optionIndex]}
                    </span>
                    <span className="flex-1">{option}</span>
                    {state === "correct" && <span className="shrink-0 text-sm font-semibold">✓ Correct</span>}
                    {state === "wrong" && <span className="shrink-0 text-sm font-semibold">✕ Your answer</span>}
                  </button>
                </li>
              );
            })}
          </ul>
          <div aria-live="polite">
            {answered && (
              <div className="mt-5 rounded-[10px] border border-[var(--tp-line)] bg-[var(--tp-green-soft)] p-4">
                <p className="font-semibold">
                  {correct ? "Correct." : `Not quite. The answer is ${letters[question.answer]}.`}
                </p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-[var(--tp-muted)]">{question.explanation}</p>
              </div>
            )}
          </div>
          {answered && (
            <button
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--tp-green)] px-5 font-semibold text-white transition-colors hover:bg-[var(--tp-green-dark)] dark:text-[#10241a]"
              onClick={next}
              type="button"
            >
              {index === questions.length - 1 ? "See your score" : "Next question"} <span aria-hidden="true">→</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
