"use client";

import { useMemo, useState } from "react";

type Cell = string; 
type Board = Cell[][]; 

const emptyBoard: Board = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => ".")
);

const EXAMPLE: Board = [
  ["5",".",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"],
];

function clone(b: Board): Board {
  return b.map(r => r.slice());
}

export default function SudokuDemo() {
  const [board, setBoard] = useState<Board>(clone(EXAMPLE));
  const [status, setStatus] = useState<string>("");

  const rows = useMemo(() => Array.from({ length: 9 }, () => new Set<string>()), []);
  const cols = useMemo(() => Array.from({ length: 9 }, () => new Set<string>()), []);
  const boxes = useMemo(() => Array.from({ length: 9 }, () => new Set<string>()), []);

  function hydrateSets(b: Board) {
    rows.forEach(s => s.clear());
    cols.forEach(s => s.clear());
    boxes.forEach(s => s.clear());
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const v = b[i][j];
        if (v !== ".") {
          const box = Math.floor(i / 3) * 3 + Math.floor(j / 3);
          rows[i].add(v);
          cols[j].add(v);
          boxes[box].add(v);
        }
      }
    }
  }

  function solve(current: Board): boolean {
    const empties: Array<[number, number]> = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (current[i][j] === ".") empties.push([i, j]);
      }
    }

    function backtrack(index: number): boolean {
      if (index === empties.length) return true;
      const [i, j] = empties[index];
      const box = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      for (const num of ["1","2","3","4","5","6","7","8","9"]) {
        if (!rows[i].has(num) && !cols[j].has(num) && !boxes[box].has(num)) {
          current[i][j] = num;
          rows[i].add(num); cols[j].add(num); boxes[box].add(num);

          if (backtrack(index + 1)) return true;

          current[i][j] = ".";
          rows[i].delete(num); cols[j].delete(num); boxes[box].delete(num);
        }
      }
      return false;
    }

    return backtrack(0);
  }

  function onSolve() {
    setStatus("Solving…");
    const work = clone(board);
    hydrateSets(work);
    const ok = solve(work);
    if (ok) {
      setBoard(work);
      setStatus("Solved ✅");
    } else {
      setStatus("No solution found ❌");
    }
  }

  function onReset() {
    setBoard(clone(emptyBoard));
    setStatus("");
  }

  function onLoadExample() {
    setBoard(clone(EXAMPLE));
    setStatus("Loaded example");
  }

  function setCell(i: number, j: number, val: string) {
    const v = val.replace(/[^1-9]/g, "").slice(0, 1);
    const next = clone(board);
    next[i][j] = v === "" ? "." : v;
    setBoard(next);
    setStatus("");
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={onLoadExample} className="icon-label">Load Example</button>
        <button onClick={onSolve} className="icon-label">Solve</button>
        <button onClick={onReset} className="icon-label">Reset</button>
        <span style={{ alignSelf: "center", color: "#64748b" }}>{status}</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 40px)",
          gap: 2,
          padding: 8,
          background: "#0f172a",
          borderRadius: 8,
          width: "fit-content",
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => {
            const thickRight = (j + 1) % 3 === 0 && j !== 8;
            const thickBottom = (i + 1) % 3 === 0 && i !== 8;
            return (
              <input
                key={`${i}-${j}`}
                value={cell === "." ? "" : cell}
                onChange={(e) => setCell(i, j, e.target.value)}
                inputMode="numeric"
                pattern="[1-9]*"
                maxLength={1}
                style={{
                  width: 40,
                  height: 40,
                  textAlign: "center",
                  fontWeight: 700,
                  background: "#111827",
                  color: "#e5e7eb",
                  border: "1px solid #1f2937",
                  outline: "none",
                  borderRight: thickRight ? "3px solid #334155" : undefined,
                  borderBottom: thickBottom ? "3px solid #334155" : undefined,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
