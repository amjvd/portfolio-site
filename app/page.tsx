"use client";

import { useState } from "react";
import ProjectsWindow from "./components/ProjectsWindow";

export default function Home() {
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      {/* full-screen background */}
      <div className="wallpaper" />

      {/* Desktop icons */}
      <section className="desktop-grid">
        {/* Projects icon opens popup window */}
        <button
          className="icon"
          onClick={() => setProjectsOpen(true)}
          title="Projects"
          style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
        >
          <img src="/icons/folder-closed.png" alt="Projects folder icon" />
          <span className="icon-label">Projects</span>
        </button>

        <a className="icon" href="/about" title="About Me">
          <img src="/icons/user.png" alt="About icon" />
          <span className="icon-label">About Me</span>
        </a>

        <a className="icon" href="/blog" title="Blog">
          <img src="/icons/notepad.png" alt="Blog icon" />
          <span className="icon-label">Blog</span>
        </a>

        <a className="icon" href="/cv.pdf" title="Resume" target="_blank" rel="noreferrer">
          <img src="/icons/my-computer.png" alt="Resume icon" />
          <span className="icon-label">Resume</span>
        </a>
      </section>

      {/*Taskbar*/}
      <footer className="taskbar">
        <a href="/">Start</a>
        <a href="/projects">Projects (page)</a>
        <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noreferrer">LinkedIn</a>
        <span className="taskbar-spacer" />
        <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </footer>

      {/*popup window*/}
      <ProjectsWindow open={projectsOpen} onClose={() => setProjectsOpen(false)} />
    </div>
  );
}
