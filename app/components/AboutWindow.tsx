"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 180, y: 100 });
  const drag = useRef({ dragging: false, sx: 0, sy: 0, ox: 0, oy: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ESC key closes
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  function down(e: React.MouseEvent) {
    if (isMobile) return; // disable dragging on mobile
    drag.current = { dragging: true, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }
  function move(e: MouseEvent) {
    if (!drag.current.dragging) return;
    setPos({ x: drag.current.ox + (e.clientX - drag.current.sx), y: drag.current.oy + (e.clientY - drag.current.sy) });
  }
  function up() {
    drag.current.dragging = false;
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", up);
  }

  if (!open) return null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const windowStyle: React.CSSProperties = isMobile
    ? { left: 0, top: 0, width: "100vw", height: "100vh" }
    : { left: pos.x, top: pos.y, width: "min(500px, 90vw)", height: "auto" };

  return (
    <div className="window-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="window" onClick={stop} style={windowStyle}>
        <div className="titlebar" onMouseDown={down}>
          <div className="titlebar-title">About Me</div>
          <button className="close-btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>

        <div className="window-body" style={{ maxHeight: isMobile ? "calc(100vh - 36px)" : "70vh", overflow: "auto" }}>
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
              Hi, I’m Amjad, an up and coming engineer. I love learning new things,
              building small tools and solvers, and sharing what I discover. This site
              is a playful Windows-XP style desktop for my projects, click around!
            </p>

            <ul style={{ margin: 0, paddingLeft: 18, color: "#334155" }}>
              <li>Interests: Algorithms, Web apps, Systems</li>
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
