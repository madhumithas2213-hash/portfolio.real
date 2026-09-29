# Madhumitha S. &mdash; Professional Portfolio Website

An interview-ready, corporate-grade personal portfolio website developed for **Madhumitha S.**, 3rd-Year Computer Science and Engineering student at **K.S.R. College of Engineering, Tiruchengode**.

Designed specifically for campus placements, technical internships, and recruiter evaluations.

---

## 🚀 Key Highlights & Features

- **Recruiter-Friendly Design**: Clean corporate aesthetic using Navy Blue (`#1e3a8a`, `#2563eb`), slate grays, and crisp whites. Free of cartoonish graphics, distracting animations, or clutter.
- **Dark & Light Mode**: Seamless theme toggle that persists across sessions via `localStorage` and automatically respects system OS preferences.
- **Honest Skill Presentation**: Displays skill tiers (*Proficient*, *Working Knowledge*, *Fundamentals / Academic*) without artificial or misleading percentage bars.
- **Structured Project Case Studies**: Includes Problem Statement, Proposed Solution, Tech Stack, Key Features, Role, and Development Status.
- **Verified Education Timeline**: Highlights B.E. CSE (CGPA: 8.023) and 12th Standard from GHSS Saravanapuram (84%).
- **Mobile-First & Responsive**: Adapts seamlessly to smartphones, tablets, laptops, and desktop screens with an accessible slide-out mobile drawer.
- **Interactive Utilities**:
  - One-click copy email button with instant toast notification.
  - Client-side validated contact form with accessible feedback.
  - Active navigation scroll spy highlighting the current section in the viewport.
  - Smooth back-to-top scroller.
  - In-browser resume preview and direct PDF download.

---

## 📁 Project Structure

```text
portfolio/
├── index.html              # Semantic, accessible HTML5 structure & content
├── styles.css              # Corporate design system tokens, responsive layout, dark/light themes
├── script.js               # Theme manager, mobile drawer, scroll spy, contact form & copy utils
├── README.md               # Documentation & customization guide
└── assets/
    ├── favicon.svg         # Branded "MS" SVG monogram favicon
    └── resume-placeholder.pdf  # Downloadable placeholder resume file
```

---

## 💻 How to Run Locally

Since this portfolio is built with zero-dependency native web standards (HTML5, CSS3, ES6 JavaScript), you can run it immediately without running complex `npm install` steps:

### Option 1: Double-Click (Direct Browser)
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
Using Python (built into Windows/macOS/Linux):
```bash
python -m http.server 5500
```
Then open your browser and navigate to:
```text
http://localhost:5500
```

### Option 3: VS Code Live Server
If you use Visual Studio Code, right-click `index.html` and select **"Open with Live Server"**.

---

## ✏️ How to Customize Placeholders

All personal information placeholders are clearly commented in `index.html`:

1. **Email & Phone Number**:
   - In `index.html`, locate `#emailLink` and `#copyEmailBtn`. Update the email address and phone number to your preferred contact info.
2. **LinkedIn & GitHub**:
   - Locate the `social-links-grid` in `index.html`. Update `href="https://linkedin.com/in/madhumitha-s"` and `href="https://github.com/madhumitha-s"` with your exact profile URLs.
3. **Official Resume**:
   - Replace `assets/resume-placeholder.pdf` with your actual exported resume named `resume-placeholder.pdf` (or update the filename in `index.html`).
4. **Projects**:
   - Update the project case study in `<section id="projects">` as your capstone project evolves.
