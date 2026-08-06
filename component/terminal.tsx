"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalProps {
  personalInfo: any[];
  selectedColor: string;
  onDownloadCV: () => void;
}

export default function Terminal({ personalInfo, selectedColor, onDownloadCV }: TerminalProps) {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isAutoTyping, setIsAutoTyping] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAutoTypingRef = useRef(true);

  // Parse prop data into cleaner JSON formatting
  const formattedInfo = personalInfo.reduce((acc, item) => {
    const key = Object.keys(item)[0];
    const jsonKey = key.toLowerCase().replace(/\s+(.)/g, (_, group) => group.toUpperCase());
    acc[jsonKey] = item[key];
    return acc;
  }, {} as Record<string, any>);

  // Render highlighted JSON markup
  const renderHighlightedJson = (obj: any) => {
    const jsonString = JSON.stringify(obj, null, 2);
    return (
      <code className="block text-stone-200 leading-relaxed font-mono">
        {jsonString.split("\n").map((line, i) => {
          const match = line.match(/^(\s*)(".*?")(\s*:\s*)(.*?)(,?)$/);
          if (match) {
            const [, indent, key, colon, val, comma] = match;
            const isStringVal = val.startsWith('"');
            return (
              <div key={i} className="whitespace-pre">
                {indent}
                <span style={{ color: selectedColor }}>{key}</span>
                <span className="text-stone-400">{colon}</span>
                <span className={isStringVal ? "text-emerald-400" : "text-amber-400"}>
                  {val}
                </span>
                <span className="text-stone-400">{comma}</span>
              </div>
            );
          }
          return <div key={i}>{line}</div>;
        })}
      </code>
    );
  };

  const getCommandOutput = (cmd: string): React.ReactNode => {
    const cleanCmd = cmd.trim().toLowerCase();
    switch (cleanCmd) {
      case "whoami":
        return <p className="text-stone-300 pl-2">Naveed Abbasi — Full Stack Developer</p>;
      case "info":
      case "info.json":
      case "cat info.json":
        return <div className="pl-2">{renderHighlightedJson(formattedInfo)}</div>;
      case "status":
      case "npm run status":
        return (
          <div className="text-stone-300 leading-relaxed pl-2 flex flex-col gap-1">
            <p><span className="text-emerald-500">✔</span> System status: <span className="text-emerald-400">ONLINE</span></p>
            <p><span className="text-emerald-500">✔</span> Freelance status: <span className="text-emerald-400">AVAILABLE</span></p>
            <p><span className="text-emerald-500">✔</span> Active Projects: <span className="text-cyan-400">3 ongoing</span></p>
          </div>
        );
      case "cv":
      case "download":
      case "download cv":
        // Trigger CV download callback
        setTimeout(() => onDownloadCV(), 500);
        return (
          <div className="text-emerald-400 pl-2 flex flex-col gap-1">
            <p>Initiating resume download...</p>
            <p>✔ Download triggered successfully!</p>
          </div>
        );
      case "help":
        return (
          <div className="text-stone-400 pl-2 flex flex-col gap-1">
            <p className="text-stone-300 font-semibold">Available Commands:</p>
            <p><span className="text-white font-semibold">cv</span> - Download my professional resume/CV</p>
            <p><span className="text-white font-semibold">info</span> - Display detailed profile in JSON format</p>
            <p><span className="text-white font-semibold">whoami</span> - Display role and introduction details</p>
            <p><span className="text-white font-semibold">status</span> - Verify freelance status and server runtime</p>
            <p><span className="text-white font-semibold">clear</span> - Clear the console screen</p>
          </div>
        );
      default:
        return <p className="text-rose-400 pl-2">zsh: command not found: {cmd}</p>;
    }
  };

  useEffect(() => {
    const autoSteps = [
      {
        cmd: "npm run dev",
        delay: 800,
        output: (
          <div className="text-stone-400 leading-relaxed pl-2 font-mono">
            <p className="text-stone-500">{`> portfolio@1.0.0 dev`}</p>
            <p className="text-stone-500">{`> next dev`}</p>
            <p className="text-emerald-500 mt-1">▲ Next.js 14.2.3</p>
            <p>- Local:        <span className="underline text-blue-400">http://localhost:3000</span></p>
            <p className="text-emerald-400 mt-1">Ready in 380ms.</p>
          </div>
        )
      },
      {
        cmd: "cat info.json",
        delay: 1500,
        output: (
          <div className="pl-2">
            {renderHighlightedJson(formattedInfo)}
          </div>
        )
      }
    ];

    let currentStep = 0;
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    const runStep = () => {
      if (!isAutoTypingRef.current) return;

      if (currentStep >= autoSteps.length) {
        isAutoTypingRef.current = false;
        setIsAutoTyping(false);
        // Print usage tip at the end of autotype
        setLines(prev => [
          ...prev,
          <div key="hint" className="text-stone-500 pl-2 italic">
            Hint: Type <span style={{ color: selectedColor }} className="not-italic font-bold">cv</span> to download my resume, or <span className="text-white not-italic font-bold">help</span> for more commands.
          </div>
        ]);
        return;
      }

      const step = autoSteps[currentStep];

      const typeChar = () => {
        if (!isAutoTypingRef.current) return;

        if (charIndex <= step.cmd.length) {
          setCurrentInput(step.cmd.substring(0, charIndex));
          charIndex++;
          timer = setTimeout(typeChar, 60);
        } else {
          setTimeout(() => {
            if (!isAutoTypingRef.current) return;
            setLines(prev => [
              ...prev,
              <div key={`cmd-${currentStep}`} className="flex gap-1.5 text-stone-400 font-mono">
                <span style={{ color: selectedColor }}>naveed@naveed-abbasi:~$</span>
                <span className="text-white">{step.cmd}</span>
              </div>,
              <div key={`out-${currentStep}`} className="my-1.5">{step.output}</div>
            ]);
            setCurrentInput("");
            charIndex = 0;
            currentStep++;
            timer = setTimeout(runStep, step.delay);
          }, 350);
        }
      };

      typeChar();
    };

    timer = setTimeout(runStep, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [personalInfo, selectedColor]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = currentInput;
      if (!cmd.trim()) return;

      if (cmd.trim().toLowerCase() === "clear") {
        setLines([]);
      } else {
        const output = getCommandOutput(cmd);
        setLines(prev => [
          ...prev,
          <div key={Date.now()} className="flex gap-1.5 text-stone-400 font-mono">
            <span style={{ color: selectedColor }}>naveed@naveed-abbasi:~$</span>
            <span className="text-white">{cmd}</span>
          </div>,
          <div key={Date.now() + 1} className="my-1.5">{output}</div>
        ]);
      }
      setCurrentInput("");
    }
  };

  const focusTerminalInput = () => {
    // If clicked while autotyping is running, interrupt it instantly so they can type
    if (isAutoTypingRef.current) {
      isAutoTypingRef.current = false;
      setIsAutoTyping(false);
      setCurrentInput("");
      setLines(prev => [
        ...prev,
        <div key="interrupted-hint" className="text-stone-500 pl-2 italic">
          Session interrupted. Interactive mode enabled. Type <span style={{ color: selectedColor }} className="not-italic font-bold">cv</span> to download my resume, or <span className="text-white not-italic font-bold">help</span>.
        </div>
      ]);
    }
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  return (
    <div
      onClick={focusTerminalInput}
      className="w-full rounded-xl border bg-[#0c0c0e] font-mono text-xs sm:text-sm text-stone-300 shadow-2xl overflow-hidden transition-all duration-300 cursor-text"
      style={{
        borderColor: isFocused ? selectedColor : "rgba(255, 255, 255, 0.1)",
        boxShadow: isFocused ? `0 0 25px ${selectedColor}33` : "none"
      }}
    >
      {/* macOS Style Header Bar */}
      <div className="flex items-center justify-between bg-[#141416] px-4 py-3 border-b border-white/5 select-none">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ef4444] transition-colors" />
          <div className="h-3 w-3 rounded-full bg-[#eab308] transition-colors" />
          <div className="h-3 w-3 rounded-full bg-[#22c55e] transition-colors" />
        </div>
        <div className="text-[11px] text-stone-400 font-sans tracking-wide">portfolio — naveed@portfolio</div>
        <div className="w-12" />
      </div>

      {/* Terminal window body */}
      <div
        ref={containerRef}
        className="p-5 h-[340px] overflow-y-auto flex flex-col gap-2.5 scrollbar-none bg-[#08080a]"
      >
        {lines}

        {/* Current Active Input line */}
        <div className="flex items-center gap-1.5 text-stone-400 font-mono w-full">
          <span style={{ color: selectedColor }} className="flex-shrink-0 select-none">naveed@naveed-abbasi:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => {
              if (!isAutoTypingRef.current) {
                setCurrentInput(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isAutoTyping}
            className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white font-mono p-0 m-0 text-xs sm:text-sm select-text"
            style={{
              caretColor: selectedColor,
            }}
            aria-label="Terminal prompt input"
          />
        </div>
      </div>
    </div>
  );
}
