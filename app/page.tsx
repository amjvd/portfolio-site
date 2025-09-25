"use client";

import { useState } from "react";
import ProjectsWindow from "./components/ProjectsWindow";
import SudokuWindow from "./components/SudokuWindow";
import AboutWindow from "./components/AboutWindow";
import BlogWindow from "./components/BlogWindow";
import ResumeWindow from "./components/ResumeWindow";
import CalculatorWindow from "./components/CalculatorWindow";
import SortingWindow from "./components/SortingWindow";

export default function Home() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [sudokuOpen, setSudokuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <div className="wallpaper" />

      {/* Desktop icons */}
      <section className="desktop-grid">
        <button
          className="icon"
          onClick={() => setProjectsOpen(true)}
          title="Projects"
          style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
        >
          <img src="/icons/folder-closed.png" alt="Projects" />
          <span className="icon-label">Projects</span>
        </button>

        <button
          className="icon"
          onClick={() => setAboutOpen(true)}
          title="About Me"
          style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
        >
          <img src="/icons/user.png" alt="About Me" />
          <span className="icon-label">About Me</span>
        </button>

        <button
          className="icon"
          onClick={() => setBlogOpen(true)}
          title="Blog"
          style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
        >
          <img src="/icons/notepad.png" alt="Blog" />
          <span className="icon-label">Blog</span>
        </button>

        <button
          className="icon"
          onClick={() => setResumeOpen(true)}
          title="CV"
          style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
        >
          <img src="/icons/my-computer.png" alt="CV" />
          <span className="icon-label">CV</span>
        </button>
      </section>

      {/* Taskbar */}
      <footer className="taskbar">
        <a href="/">Start</a>
        <button
          onClick={() => setProjectsOpen(true)}
          style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer" }}
        >
          Projects
        </button>
        <button
          onClick={() => setBlogOpen(true)}
          style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer" }}
        >
          Blog
        </button>
        <button
          onClick={() => setAboutOpen(true)}
          style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer" }}
        >
          About
        </button>
        <button
          onClick={() => setResumeOpen(true)}
          style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer" }}
        >
          Resume
        </button>
        <span className="taskbar-spacer" />
        <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </footer>

      {/* Windows */}
      <ProjectsWindow
        open={projectsOpen}
        onClose={() => setProjectsOpen(false)}
        
      />
      <SudokuWindow open={sudokuOpen} onClose={() => setSudokuOpen(false)} />
      <CalculatorWindow open={calcOpen} onClose={() => setCalcOpen(false)} />
      <SortingWindow open={sortingOpen} onClose={() => setSortingOpen(false)} />
      <AboutWindow open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <BlogWindow open={blogOpen} onClose={() => setBlogOpen(false)} />
      <ResumeWindow open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
