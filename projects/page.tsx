export default function ProjectsPage() {
  const projects = [
    {
      slug: "sudoku-solver",
      title: "Sudoku Solver",
      blurb: "Backtracking + pruning; LeetCode-ready.",
      thumb: "/projects/sudoku.png",
    },
  ];

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>Projects</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {projects.map((p) => (
          <a
            key={p.slug}
            href={`/projects/${p.slug}`}
            style={{
              display: "block",
              padding: 12,
              background: "#0F172A",
              border: "1px solid #1f2937",
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ aspectRatio: "16/9", background: "#111827", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
              <img src={p.thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>{p.blurb}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
