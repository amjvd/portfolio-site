"use client";

import { useEffect, useRef, useState } from "react";

type Post = {
  slug: string;
  title: string;
  thumb: string;
  blurb: string;
  content: React.ReactNode;
};

const POSTS: Post[] = [
  {
    slug: "sudoku-solver-deep-dive",
    title: "Sudoku Solver: Deep Dive",
    thumb: "/icons/sudoku.jpg",
    blurb: "Explaining how sets + backtracking crack Sudoku puzzles.",
    content: (
      <div style={{ display: "grid", gap: 12 }}>
        <p>
          My Sudoku solver uses <b>backtracking with pruning</b> to fill empty cells one by one.
          Each row, column, and 3×3 box is tracked with a <code>set()</code>, so checking whether
          a number is valid is extremely fast (O(1)).
        </p>
        <p>
          The algorithm tries digits 1–9 in each empty cell. If a digit fits, it recurses deeper.
          If it reaches a contradiction, it backtracks and tries the next digit. This depth first
          approach guarantees a solution if one exists.
        </p>
        <pre
          style={{
            overflowX: "auto",
            background: "#0b1220",
            color: "#e5e7eb",
            padding: 12,
            borderRadius: 8,
          }}
        >{`def backtrack(index):
    if index == len(empty_cells): return True
    i, j = empty_cells[index]; b = (i//3)*3 + (j//3)
    for d in '123456789':
        if d not in rows[i] and d not in cols[j] and d not in boxes[b]:
            board[i][j] = d
            rows[i].add(d); cols[j].add(d); boxes[b].add(d)
            if backtrack(index + 1): return True
            rows[i].remove(d); cols[j].remove(d); boxes[b].remove(d)
            board[i][j] = '.'
    return False`}</pre>
        <p>
          It’s not the fastest solver in the world, but it reliably completes any valid Sudoku.
          The project taught me how <b>constraint satisfaction</b> works in practice.
        </p>
        <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 8, overflow: "hidden" }}>
          <iframe
            src="https://www.youtube.com/embed/nmKCSF4h6k0"
            title="Sudoku Solver Walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      </div>
    ),
  },
  {
    slug: "apple-clock-no-loop",
    title: "Why Apple’s Clock Timer Doesn’t Use a Loop",
    thumb: "/icons/clock.png",
    blurb: "Exploring design choices in Apple’s smooth clock animation.",
    content: (
      <div style={{ display: "grid", gap: 12 }}>
        <p>
          At first glance, the iOS timer picker feels like it scrolls forever. Minutes and
          hours spin past in a smooth wheel, almost like an endless list. Many people
          assumed it was looping rows under the hood.
        </p>
        <p>
          But a viral video showed that if you keep swiping long enough, you actually
          reach the end. Apple didn’t build a looping picker here, it’s just a very
          long finite list.
        </p>
        <div style={{ textAlign: "center" }}>
          <img
            src="/icons/timeend.png"
            alt="iOS timer picker reaching the end"
            style={{
              display: "block",
              margin: "12px auto",
              borderRadius: 8,
              maxWidth: "100%",
            }}
          />
          <p style={{ fontSize: 14, color: "#94a3b8" }}>
            Screenshot of the timer picker eventually reaching its limit
          </p>
        </div>
        <ul>
          <li>The design creates the illusion of infinity, even though a limit exists.</li>
          <li>It’s simpler to implement than recycling rows in a true loop.</li>
          <li>For everyday use, most people never scroll far enough to notice the end.</li>
        </ul>
        <p>
          It’s a neat example of Apple’s approach: use a straightforward solution that
          feels seamless in practice. To the user it looks infinite, but under the hood
          it’s just a carefully designed long list with boundaries.
        </p>
        <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 8, overflow: "hidden" }}>
          <iframe
            src="https://www.youtube.com/embed/V3jH7gH--Og"
            title="Apple Clock Explained"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      </div>
    ),
  },
  {
    slug: "sorting-methods-quick-guide",
    title: "Sorting Methods: Quick & Clear",
    thumb: "/icons/sort.png",
    blurb: "Bubble, Insertion, Merge, Quick: which to use and when.",
    content: (
      <div style={{ display: "grid", gap: 12 }}>
        <p>
          Sorting is one of the most fundamental problems in computer science. There are
          tons of algorithms, but here are the four classics: <b>Bubble</b>, <b>Insertion</b>,
          <b>Merge</b>, and <b>Quick</b>.
        </p>

        <h3>Bubble Sort:</h3>
        <ul>
          <li>Swap neighbors until the list is sorted.</li>
          <li>Very easy to understand and visualize.</li>
          <li>Slow in practice: <code>O(n²)</code> on average.</li>
        </ul>

        <h3>Insertion Sort:</h3>
        <ul>
          <li>Builds a sorted list one element at a time.</li>
          <li>Excellent for small or nearly sorted inputs.</li>
          <li>Worst case still <code>O(n²)</code>.</li>
        </ul>

        <h3>Merge Sort:</h3>
        <ul>
          <li>Divide the list, sort each half, then merge.</li>
          <li>Predictable performance: always <code>O(n log n)</code>.</li>
          <li>Stable, but needs extra memory for merging.</li>
        </ul>

        <h3>Quick Sort:</h3>
        <ul>
          <li>Pick a pivot, partition the list, then recurse.</li>
          <li>Usually the fastest in practice thanks to cache-friendliness.</li>
          <li>Average <code>O(n log n)</code>, but worst case <code>O(n²)</code>.</li>
        </ul>

        <p>
          In short: <b>Bubble</b> is for teaching, <b>Insertion</b> is for tiny or nearly
          sorted lists, <b>Merge</b> guarantees performance, and <b>Quick</b> is the
          practical all-rounder.
        </p>
        <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 8, overflow: "hidden" }}>
          <iframe
            src="https://www.youtube.com/embed/H6sgM0hRYDo"
            title="Sorting Visualizer Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      </div>
    ),
  },
];

export default function BlogWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 160, y: 140 });
  const [selected, setSelected] = useState<Post | null>(null);
  const drag = useRef({ dragging: false, sx: 0, sy: 0, ox: 0, oy: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  function down(e: React.MouseEvent) {
    if (isMobile) return; // disable drag on mobile
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
    : selected
    ? { left: pos.x, top: pos.y, width: "min(940px, 96vw)", height: "min(80vh, 900px)" }
    : { left: pos.x, top: pos.y, width: "min(600px, 90vw)", height: "auto" };

  return (
    <div className="window-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="window" onClick={stop} style={windowStyle}>
        <div className="titlebar" onMouseDown={down}>
          <div className="titlebar-title">{selected ? selected.title : "Blog"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {selected && (
              <button className="icon-label" onClick={() => setSelected(null)}>← Back</button>
            )}
            <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        <div
          className="window-body"
          style={{
            maxHeight: isMobile ? "calc(100vh - 36px)" : "70vh",
            overflow: "auto",
          }}
        >
          {!selected ? (
            <div className="files-grid">
              {POSTS.map((p) => (
                <button
                  key={p.slug}
                  className="icon"
                  onClick={() => setSelected(p)}
                  style={{ background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
                >
                  <img src={p.thumb} alt={p.title} />
                  <span className="icon-label">{p.title}</span>
                </button>
              ))}
            </div>
          ) : (
            <article style={{ display: "grid", gap: 12 }}>{selected.content}</article>
          )}
        </div>
      </div>
    </div>
  );
}
