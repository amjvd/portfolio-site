"use client";

import { useEffect, useRef, useState } from "react";

type Algo = "bubble" | "insertion" | "merge" | "quick";

function randomArray(n = 40) {
  return Array.from({ length: n }, () => 5 + Math.floor(Math.random() * 95));
}

export default function SortingDemo() {
  const [arr, setArr] = useState<number[]>(randomArray());
  const [algo, setAlgo] = useState<Algo>("bubble");
  const [speed, setSpeed] = useState<number>(60);
  const [running, setRunning] = useState(false);
  const highlight = useRef<{ i: number; j: number }>({ i: -1, j: -1 });

  useEffect(() => {
    return () => setRunning(false);
  }, []);

  async function sleep(ms: number) {
    await new Promise((r) => setTimeout(r, ms));
  }

  function delayFromSpeed(s: number) {
    return 110 - s; 
  }

  async function runBubble() {
    setRunning(true);
    const a = arr.slice();
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        highlight.current = { i: j, j: j + 1 };
        setArr(a.slice());
        await sleep(delayFromSpeed(speed));
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          setArr(a.slice());
          await sleep(delayFromSpeed(speed));
        }
      }
    }
    highlight.current = { i: -1, j: -1 };
    setRunning(false);
  }

  async function runInsertion() {
    setRunning(true);
    const a = arr.slice();
    for (let i = 1; i < a.length; i++) {
      let key = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > key) {
        highlight.current = { i: j, j: j + 1 };
        a[j + 1] = a[j];
        setArr(a.slice());
        await sleep(delayFromSpeed(speed));
        j--;
      }
      a[j + 1] = key;
      setArr(a.slice());
      await sleep(delayFromSpeed(speed));
    }
    highlight.current = { i: -1, j: -1 };
    setRunning(false);
  }


  async function runMergeSort() {
    setRunning(true);
    const a = arr.slice();

    async function mergeSort(start: number, end: number) {
      if (end - start <= 1) return;
      const mid = Math.floor((start + end) / 2);
      await mergeSort(start, mid);
      await mergeSort(mid, end);

      const left = a.slice(start, mid);
      const right = a.slice(mid, end);
      let i = 0,
        j = 0,
        k = start;

      while (i < left.length && j < right.length) {
        highlight.current = { i: start + i, j: mid + j };
        if (left[i] <= right[j]) {
          a[k++] = left[i++];
        } else {
          a[k++] = right[j++];
        }
        setArr(a.slice());
        await sleep(delayFromSpeed(speed));
      }
      while (i < left.length) {
        a[k++] = left[i++];
        setArr(a.slice());
        await sleep(delayFromSpeed(speed));
      }
      while (j < right.length) {
        a[k++] = right[j++];
        setArr(a.slice());
        await sleep(delayFromSpeed(speed));
      }
    }

    await mergeSort(0, a.length);
    highlight.current = { i: -1, j: -1 };
    setRunning(false);
  }


  async function runQuickSort() {
    setRunning(true);
    const a = arr.slice();

    async function quickSort(start: number, end: number) {
      if (start >= end) return;
      let pivot = a[end];
      let i = start;
      for (let j = start; j < end; j++) {
        highlight.current = { i: j, j: end };
        setArr(a.slice());
        await sleep(delayFromSpeed(speed));
        if (a[j] < pivot) {
          [a[i], a[j]] = [a[j], a[i]];
          i++;
          setArr(a.slice());
          await sleep(delayFromSpeed(speed));
        }
      }
      [a[i], a[end]] = [a[end], a[i]];
      setArr(a.slice());
      await sleep(delayFromSpeed(speed));

      await quickSort(start, i - 1);
      await quickSort(i + 1, end);
    }

    await quickSort(0, a.length - 1);
    highlight.current = { i: -1, j: -1 };
    setRunning(false);
  }

  async function run() {
    if (running) return;
    if (algo === "bubble") await runBubble();
    else if (algo === "insertion") await runInsertion();
    else if (algo === "merge") await runMergeSort();
    else if (algo === "quick") await runQuickSort();
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value as Algo)}
          style={{
            padding: "6px 8px",
            borderRadius: 8,
            border: "1px solid #1f2937",
            background: "#0b1220",
            color: "#e5e7eb",
          }}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
        <label style={{ color: "#64748b", fontSize: 14 }}>Speed</label>
        <input
          type="range"
          min={1}
          max={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <button className="icon-label" onClick={run} disabled={running}>
          Run
        </button>
        <button className="icon-label" onClick={() => setArr(randomArray())} disabled={running}>
          Shuffle
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${arr.length}, 1fr)`,
          gap: 2,
          height: 160,
          alignItems: "end",
          background: "#0f172a",
          borderRadius: 8,
          padding: 8,
        }}
      >
        {arr.map((v, idx) => {
          const active = idx === highlight.current.i || idx === highlight.current.j;
          return (
            <div
              key={idx}
              style={{
                height: `${v}%`,
                background: active ? "#3b82f6" : "#9ca3af",
                borderRadius: 2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
