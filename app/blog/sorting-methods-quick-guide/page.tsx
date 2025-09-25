export default function SortingQuickGuide() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>
        Sorting Methods — Quick & Clear
      </h1>
      <p style={{ color: "#94a3b8" }}>
        A fast tour of Bubble, Insertion, Merge, and Quick sort: how they work, when to use them, and what their Big-O means.
      </p>

      <h2 style={{ marginTop: 24 }}>Bubble Sort</h2>
      <p>Compare neighbors and swap if out of order. Repeat until sorted. Easiest to visualize, slow in practice.</p>
      <ul>
        <li>Best: <code>O(n)</code> (already sorted)</li>
        <li>Avg/Worst: <code>O(n²)</code></li>
        <li>Space: <code>O(1)</code></li>
        <li>Use when: teaching/visualizing basics.</li>
      </ul>

      <h2>Insertion Sort</h2>
      <p>Builds a sorted left side by inserting each item into its correct spot. Great on small or almost-sorted arrays.</p>
      <ul>
        <li>Best: <code>O(n)</code> (nearly sorted)</li>
        <li>Avg/Worst: <code>O(n²)</code></li>
        <li>Space: <code>O(1)</code></li>
        <li>Use when: tiny inputs or almost sorted data.</li>
      </ul>

      <h2>Merge Sort</h2>
      <p>Divide in half, sort each half, and merge. Stable, predictable performance.</p>
      <ul>
        <li>Best/Avg/Worst: <code>O(n log n)</code></li>
        <li>Space: <code>O(n)</code> (needs extra array)</li>
        <li>Use when: you need stability and guaranteed performance.</li>
      </ul>

      <h2>Quick Sort</h2>
      <p>Pick a pivot, partition smaller left / larger right, recurse. Usually fastest in practice with good pivots.</p>
      <ul>
        <li>Best/Avg: <code>O(n log n)</code></li>
        <li>Worst: <code>O(n²)</code> (bad pivot choices)</li>
        <li>Space: <code>O(log n)</code> (recursion)</li>
        <li>Use when: general-purpose, in-place, great cache behavior.</li>
      </ul>

      <h2 style={{ marginTop: 24 }}>TL;DR</h2>
      <ul>
        <li><b>Bubble</b> → simple but slow; great for teaching.</li>
        <li><b>Insertion</b> → tiny or nearly-sorted inputs.</li>
        <li><b>Merge</b> → stable, predictable; extra memory.</li>
        <li><b>Quick</b> → usually fastest; watch for worst cases.</li>
      </ul>

      <a className="icon-label" href="/projects">Back to Projects</a>
    </main>
  );
}
