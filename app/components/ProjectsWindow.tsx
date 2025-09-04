"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectsWindow({ open, onClose }: Props) {
  const winRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="window-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="window" onClick={stop} ref={winRef}>
        <div className="titlebar">
          <div className="titlebar-title">Projects</div>
          <button
            className="close-btn"
            aria-label="Close"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="window-body">
                <div className="files-grid">
        <a href="/projects/sudoku-solver" className="icon" title="Sudoku Solver">
            <img src="/projects/sudoku.png" alt="Sudoku Solver icon" />
            <span className="icon-label">Sudoku Solver</span>
        </a>
        </div>

        </div>
      </div>
    </div>
  );
}
