"use client";

import { useEffect, useRef, useState } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&";
const DURATION_MS = 1100;
const FRAME_INTERVAL_MS = 38;

function scrambleText(text: string, progress: number) {
  const revealCount = Math.floor(progress * text.length);

  return Array.from(text, (character, index) => {
    if (character === " " || character === '"') return character;
    if (index < revealCount || progress >= 1) return character;
    return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }).join("");
}

export default function ScrambleTitle({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    let animationFrame = 0;
    let startedAt = 0;
    let lastFrameAt = 0;

    const animate = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const elapsed = timestamp - startedAt;
      const progress = Math.min(elapsed / DURATION_MS, 1);

      if (timestamp - lastFrameAt >= FRAME_INTERVAL_MS || progress === 1) {
        setDisplayText(scrambleText(text, progress));
        lastFrameAt = timestamp;
      }

      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    setDisplayText(scrambleText(text, 0));
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [text]);

  return (
    <h1 className="scramble-title" aria-label={text}>
      <span className="scramble-title-sizer" aria-hidden="true">{text}</span>
      <span className="scramble-title-output" aria-hidden="true">{displayText}</span>
    </h1>
  );
}
