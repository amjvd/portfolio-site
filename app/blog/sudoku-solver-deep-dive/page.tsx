export default function SudokuDeepDive() {
  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>
        Sudoku Solver — Deep Dive
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: 16 }}>
        A line-by-line explanation of my backtracking solver using row/col/box sets.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>Goals</h2>
      <ul>
        <li>Explain data structures: <b>rows</b>, <b>cols</b>, <b>boxes</b>.</li>
        <li>Walk through backtracking & undo.</li>
        <li>Discuss typical vs worst-case complexity.</li>
      </ul>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>Key snippet</h2>
      <pre style={{ overflowX: "auto", background: "#0b1220", color: "#e5e7eb", padding: 12, borderRadius: 8 }}>
{`# Choose next empty, try digits, recurse, undo on fail
def backtrack(index):
    if index == len(empty_cells): return True
    i, j = empty_cells[index]; b = (i//3)*3 + (j//3)
    for d in '123456789':
        if d not in rows[i] and d not in cols[j] and d not in boxes[b]:
            board[i][j] = d
            rows[i].add(d); cols[j].add(d); boxes[b].add(d)
            if backtrack(index + 1): return True
            rows[i].remove(d); cols[j].remove(d); boxes[b].remove(d)
            board[i][j] = '.'
    return False`}
      </pre>

      <p style={{ marginTop: 16 }}>
        (Add your commentary here — e.g., why sets are O(1), choosing order of cells, MRV heuristic ideas, etc.)
      </p>

      <a className="icon-label" href="/projects/sudoku-solver">Back to project</a>
    </main>
  );
}
