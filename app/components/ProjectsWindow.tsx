"use client";

import { useEffect, useRef, useState } from "react";
import SudokuDemo from "./SudokuDemo";
import CalculatorDemo from "./CalculatorDemo";
import SortingDemo from "./SortingDemo";

type ProjectKey = "sudoku" | "calculator" | "sorting" | null;

export default function ProjectsWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 80, y: 80 });
  const [selected, setSelected] = useState<ProjectKey>(null);
  const drag = useRef({ dragging: false, sx: 0, sy: 0, ox: 0, oy: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ESC closes
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
    setPos({
      x: drag.current.ox + (e.clientX - drag.current.sx),
      y: drag.current.oy + (e.clientY - drag.current.sy),
    });
  }
  function up() {
    drag.current.dragging = false;
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", up);
  }

  if (!open) return null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  // Match BlogWindow behavior exactly:
  // - Mobile: fullscreen
  // - Desktop + icon view: auto height (no whitespace)
  // - Desktop + project open: fixed height with scroll
  const windowStyle: React.CSSProperties = isMobile
    ? { left: 0, top: 0, width: "100vw", height: "100vh", borderRadius: 0 }
    : selected
    ? { left: pos.x, top: pos.y, width: "min(900px, 96vw)", height: "min(80vh, 900px)" }
    : { left: pos.x, top: pos.y, width: "min(900px, 96vw)", height: "auto" };

  const bodyStyle: React.CSSProperties = isMobile
    ? { maxHeight: "calc(100vh - 36px)", overflow: "auto" }
    : selected
    ? { maxHeight: "70vh", overflow: "auto" }   // project open -> scroll
    : { maxHeight: "none", overflow: "visible" }; // icon grid -> shrink to fit

  return (
    <div className="window-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="window" onClick={stop} style={windowStyle}>
        <div className="titlebar" onMouseDown={down}>
          <div className="titlebar-title">
            {selected === null
              ? "Projects"
              : selected === "sudoku"
              ? "Sudoku Solver"
              : selected === "calculator"
              ? "Calculator"
              : "Sorting Visualizer"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {selected && (
              <button className="icon-label" onClick={() => setSelected(null)}>
                ← Back
              </button>
            )}
            <button className="close-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <div className="window-body" style={bodyStyle}>
          {selected === null ? (
            <div className="files-grid">
              <button
                className="icon"
                onClick={() => setSelected("sudoku")}
                style={{ background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
              >
                <img src="/icons/sudoku.jpg" alt="Sudoku Solver" />
                <span className="icon-label">Sudoku Solver</span>
              </button>

              <button
                className="icon"
                onClick={() => setSelected("calculator")}
                style={{ background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
              >
                <img src="/icons/calculator.png" alt="Calculator" />
                <span className="icon-label">Calculator</span>
              </button>

              <button
                className="icon"
                onClick={() => setSelected("sorting")}
                style={{ background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
              >
                <img src="/icons/sort.png" alt="Sorting Visualizer" />
                <span className="icon-label">Sorting Visualizer</span>
              </button>
            </div>
          ) : selected === "sudoku" ? (
            <SudokuDemo />
          ) : selected === "calculator" ? (
            <CalculatorDemo />
          ) : (
            <SortingDemo />
          )}
        </div>
      </div>
    </div>
  );
}
