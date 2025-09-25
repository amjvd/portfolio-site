export default function AppleClockPost() {
  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>
        Why didn’t Apple use a loop for its clock?
      </h1>
      <p style={{ color: "#94a3b8" }}>
        Teaser: OS-level tick, power constraints, vs animation loops. (Write your deep dive here.)
      </p>
      <ul style={{ marginTop: 16 }}>
        <li>Battery/perf: avoid busy loops.</li>
        <li>OS time notifications vs JS/animation timers.</li>
        <li>Frame drops and resync strategies.</li>
      </ul>
      <a className="icon-label" href="/blog">Back to blog</a>
    </main>
  );
}
