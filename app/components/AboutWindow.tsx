"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const winRef = useRef<HTMLDivElement | null>(null);

  // starting position for the window
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 180, y: 100 });
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Drag handlers (titlebar only)
  function onMouseDown(e: React.MouseEvent) {
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }
  function onMouseMove(e: MouseEvent) {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPos({ x: dragState.current.origX + dx, y: dragState.current.origY + dy });
  }
  function onMouseUp() {
    dragState.current.dragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  if (!open) return null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="window-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="window" onClick={stop} ref={winRef} style={{ left: pos.x, top: pos.y }}>
        <div className="titlebar" onMouseDown={onMouseDown}>
          <div className="titlebar-title">About Me</div>
          <button className="close-btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>

        <div className="window-body">
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src="/icons/user.png"
                alt="Profile"
                width={48}
                height={48}
                style={{ borderRadius: 8 }}
              />
              <div style={{ fontWeight: 700, fontSize: 18 }}>Amjad Hamed</div>
            </div>

            <p style={{ margin: 0, color: "#334155" }}>
              Hi, I’m <strong>Amjad</strong>, an up and coming engineer. I love learning new things,
              building small tools and solvers, and sharing what I discover. This site is a playful
              Windows-XP style desktop for my projects, click around!
            </p>

            <ul style={{ margin: 0, paddingLeft: 18, color: "#334155" }}>
              <li>Interests: algorithms, web apps, systems</li>
              <li>Stack: Python, TypeScript/JavaScript, Next.js</li>
              <li>Currently: refining projects & posting write ups</li>
            </ul>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a className="icon-label" href="https://github.com/amjvd" target="_blank" rel="noreferrer">GitHub</a>
              <a className="icon-label" href="https://www.linkedin.com/in/amjad-hamed-b3b5032bb/" target="_blank" rel="noreferrer">LinkedIn</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
