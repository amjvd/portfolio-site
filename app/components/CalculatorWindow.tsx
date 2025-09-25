"use client";

import { useEffect, useRef, useState } from "react";
import CalculatorDemo from "app/components/CalculatorDemo";

export default function CalculatorWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 220, y: 120 });
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
      <div className="window" onClick={stop} style={{ left: pos.x, top: pos.y }}>
        <div className="titlebar" onMouseDown={down}>
          <div className="titlebar-title">Calculator</div>
          <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="window-body">
          <CalculatorDemo />
        </div>
      </div>
    </div>
  );
}
