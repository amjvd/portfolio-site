"use client";

import { useState } from "react";

const BUTTONS = [
  ["AC", "DEL", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "(", ")"],
  ["="],
];

function safeEval(expr: string): string {
  // allow digits, ops, dot, parentheses, spaces, percent
  if (/^[0-9+\-*/(). % ]+$/.test(expr) === false) return "ERR";
  try {
    // convert percent like 50% -> (50/100)
    const normalized = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
    // eslint-disable-next-line no-new-func
    const val = Function(`"use strict"; return (${normalized});`)();
    if (Number.isFinite(val)) return String(val);
    return "ERR";
  } catch {
    return "ERR";
  }
}

export default function CalculatorDemo() {
  const [display, setDisplay] = useState("0");
  const [lastIsResult, setLastIsResult] = useState(false);

  function press(key: string) {
    if (key === "AC") {
      setDisplay("0");
      setLastIsResult(false);
      return;
    }
    if (key === "DEL") {
      setDisplay((d) => (d.length <= 1 ? "0" : d.slice(0, -1)));
      return;
    }
    if (key === "=") {
      const res = safeEval(display);
      setDisplay(res);
      setLastIsResult(true);
      return;
    }
    setDisplay((d) => {
      // if last action was "=", start fresh when typing a number or "("
      if (lastIsResult && /[0-9(]/.test(key)) {
        setLastIsResult(false);
        return key;
      }
      setLastIsResult(false);
      return d === "0" && /[0-9.]/.test(key) ? key : d + key;
    });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: 280 }}>
      <div
        style={{
          background: "#0b1220",
          color: "#e5e7eb",
          padding: "12px 10px",
          borderRadius: 8,
          fontVariantNumeric: "tabular-nums",
          textAlign: "right",
          minHeight: 54,
          border: "1px solid #1f2937",
          wordBreak: "break-all",
        }}
      >
        {display}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {BUTTONS.flat().map((key, idx) => {
          const wide = key === "=" ? { gridColumn: "span 4" } : {};
          const isOp = "/-*+%=".includes(key) || key === "AC" || key === "DEL";
          return (
            <button
              key={`${key}-${idx}`}
              onClick={() => press(key)}
              style={{
                ...wide,
                height: 44,
                background: isOp ? "#254569" : "#111827",
                color: "#e5e7eb",
                border: "1px solid #1f2937",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}
