"use client";

import { useEffect, useRef, useState } from "react";

export default function ResumeWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 140, y: 80 });
  const drag = useRef({ dragging: false, sx: 0, sy: 0, ox: 0, oy: 0 });

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  function down(e: React.MouseEvent) {
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

  return (
    <div className="window-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="window" onClick={stop} style={{ left: pos.x, top: pos.y, width: "min(900px, 96vw)", height: "min(80vh, 900px)" }}>
        <div className="titlebar" onMouseDown={down}>
          <div className="titlebar-title">CV</div>
          <div style={{ display: "flex", gap: 8 }}>
            <a className="icon-label" href="/cv.pdf" target="_blank" rel="noreferrer">Open</a>
            <a className="icon-label" href="/cv.pdf" download>Download</a>
            <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>
        <div className="window-body" style={{ height: "calc(100% - 36px)", padding: 0 }}>
          <iframe src="/cv.pdf" title="CV PDF" style={{ width: "100%", height: "100%", border: 0 }} />
        </div>
      </div>
    </div>
  );
}
