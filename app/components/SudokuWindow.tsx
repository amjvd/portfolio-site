"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const SudokuDemo = dynamic(() => import("app/components/SudokuDemo"), { ssr: false });

export default function SudokuWindow({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const winRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 160, y: 120 });
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({
    dragging: false, startX: 0, startY: 0, origX: 0, origY: 0,
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
    <div className="window-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="window" onClick={stop} ref={winRef} style={{ left: pos.x, top: pos.y }}>
        <div className="titlebar" onMouseDown={onMouseDown}>
          <div className="titlebar-title">Sudoku Solver</div>
          <button className="close-btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="window-body">
          <SudokuDemo />
        </div>
      </div>
    </div>
  );
}
