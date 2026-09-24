"use client";

import { useEffect, useState, type FormEvent } from "react";

const modes = [
  { label: "overview", value: "A CS + Business student turning curious ideas into useful systems." },
  { label: "focus", value: "Currently exploring algorithms, architecture, and market-facing software." },
  { label: "signal", value: "Open to thoughtful collaborations, internships, and ambitious side quests." },
];

export function CommandCenter() {
  const [activeMode, setActiveMode] = useState("overview");
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const activeMessage = modes.find((mode) => mode.label === activeMode)?.value ?? modes[0].value;

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(activeMessage.slice(0, index));
      if (index >= activeMessage.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [activeMessage]);

  const selectMode = (mode: string) => {
    setActiveMode(mode);
    setTypedText("");
    setIsTyping(true);
    setCommand(`select --mode ${mode}`);
  };

  const runCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextCommand = command.trim();

    if (!nextCommand) {
      return;
    }

    const modeMatch = nextCommand.match(/^select\s+--mode\s+(overview|focus|signal)$/i);

    if (modeMatch) {
      selectMode(modeMatch[1].toLowerCase());
    }

    setCommandHistory([nextCommand]);
    setCommand("");
  };

  return (
    <div className="command-center glass-panel">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-rose-400" />
          <span className="size-2 rounded-full bg-amber-300" />
          <span className="size-2 rounded-full bg-emerald-300" />
          <span className="ml-2 font-mono text-[10px] tracking-[0.18em] text-slate-400 uppercase">
            cullenry@tcd:
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-300">● online</span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="font-mono text-xs leading-7 text-slate-300">
          <p><span className="text-violet-300">➜</span> whoami</p>
          <p className="text-slate-100">ryan_cullen / builder / student</p>
          <p className="mt-3"><span className="text-violet-300">➜</span> select --mode <span className="text-teal-300">{activeMode}</span></p>
          <p className="min-h-14 text-slate-400">
            {typedText}
            {isTyping && <span className="terminal-cursor" aria-hidden="true">▌</span>}
          </p>
        </div>
        <form className="terminal-input-row" onSubmit={runCommand}>
          <label className="sr-only" htmlFor="terminal-command">Type a terminal command</label>
          <span className="text-violet-300" aria-hidden="true">➜</span>
          <div className="terminal-input-wrapper">
            {!command && (
              <span className="terminal-input-placeholder" aria-hidden="true">
                type a command...<span className="terminal-cursor">▌</span>
              </span>
            )}
            <input
              autoComplete="off"
              className="terminal-input"
              id="terminal-command"
              onChange={(event) => setCommand(event.target.value)}
              spellCheck={false}
              value={command}
            />
          </div>
        </form>
        {commandHistory.length > 0 && (
          <div className="mt-3 font-mono text-xs leading-7 text-slate-300">
            {commandHistory.map((historyCommand, index) => (
              <p className={index === commandHistory.length - 1 ? "text-slate-300" : "text-slate-500"} key={`${historyCommand}-${index}`}>
                <span className="text-violet-300">➜</span> {historyCommand}
              </p>
            ))}
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Command center modes">
          {modes.map((mode) => (
            <button
              className={`command-chip ${activeMode === mode.label ? "command-chip--active" : ""}`}
              key={mode.label}
              onClick={() => selectMode(mode.label)}
              type="button"
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
