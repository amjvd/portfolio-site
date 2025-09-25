export default function BlogIndex() {
  const posts = [
    {
      slug: "sudoku-solver-deep-dive",
      title: "Sudoku Solver — Deep Dive",
      blurb: "Explaining the backtracking sets approach line-by-line with complexity notes.",
      date: "2025-09-06",
    },
    {
      slug: "apple-clock-no-loop",
      title: "Why didn’t Apple use a loop for its clock?",
      blurb: "A fun UX/eng exploration of render loops vs system tick, battery, and perf.",
      date: "2025-09-06",
    },
  ];

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>Blog</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {posts.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            style={{
              display: "block",
              padding: "14px 16px",
              border: "1px solid #1f2937",
              borderRadius: 12,
              background: "#0F172A",
              textDecoration: "none",
              color: "#e5e7eb",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 700 }}>{p.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>{p.date}</div>
            </div>
            <div style={{ color: "#94a3b8", marginTop: 6 }}>{p.blurb}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
