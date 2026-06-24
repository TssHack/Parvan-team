<div align="center">

  <h1>📖 Parvan</h1>
  
  <p><i>Engineering with intent, delivered with craft.</i></p>
  
  <p>
    <b>Parvan</b> is not just a portfolio; it's an interactive digital book. 
    A meticulously crafted bio-link platform for the Parvan Engineering Team, 
    designed from the ground up with a traditional typographic aesthetic, 
    paper-textured UI, and seamless bilingual support.
  </p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />

</div>

---

## ❖ The Aesthetic

Most portfolios look the same. We wanted ours to feel different—like opening a well-bound book. 
Parvan leverages custom CSS variables, `backdrop-filter` glassmorphism, and SVG noise textures to create a tactile, parchment-like experience. 

From *Drop Caps* at the start of biographies to *Page Curl* effects on hover, every micro-interaction is designed to reflect the patience and precision of traditional engineering.

## ✨ Highlights

- **📒 Book-First UI:** Custom CSS classes for Parchment, Book Dividers, Spines, Drop Caps, and Margin Notes.
- **🌐 True Bilingualism:** Flawless RTL (Farsi) and LTR (English) support using `Vazirmatn` and `Playfair Display`.
- **💨 Global State Persistence:** Language and Theme preferences are stored in `localStorage` and synced via React Context, surviving full page navigations without prop-drilling.
- **🚀 Smart Routing:** Custom `usePathname` hook in the header resolves the Next.js App Router `#` anchor bug across dynamic routes.
- **🎬 Micro-Interactions:** Page-peel hover effects, 3D paper-stack social cards, ink-stroke underlines, and smooth scroll-offsets.
- **📱 Mobile Drawer:** A slide-out menu designed like a book's Table of Contents, complete with chapter numbers.
- **🎨 Dynamic Typography:** A symphony of Sans-Serif for UI and Serif for literary content.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Pure CSS (No Tailwind), CSS Variables, Inline Styles |
| **Fonts** | Playfair Display (Serif EN), Noto Naskh Arabic (Serif FA), Inter (Sans EN), Vazirmatn (Sans FA) |
| **Icons** | Tabler Icons, Custom Inline SVGs (Brands) |
| **State** | React Context API + LocalStorage |

## 📖 Architecture (The Book Metaphor)

The application structure mirrors a physical book:

1. **`app/layout.tsx` (The Binding):** Wraps the app in the `StoreProvider` to hold global state (Theme/Lang).
2. **`app/page.tsx` (The Main Book):**
   - `Hero` → The Cover
   - `Frontispiece` → The Team Photo
   - `About` → The Preface
   - `Team` → Table of Contents (Links to individual chapters)
   - `Works` -> Selected Pages
   - `Footer` -> Back Cover (Colophon)
3. **`app/team/[slug]/page.tsx` (The Chapters):** Dynamic routes rendering individual member profiles with biographies, skills, and footnote-style social links.

## 🚀 Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start reading.

## 👥 The Authors

This book was written by the engineers of Parvan, students of Tabriz Azad University.

| Chapter | Author | Role | Link |
|---------|--------|------|------|
| **01** | Elshan Ghozali | SEO-Coder | [![GitHub](https://img.shields.io/badge/ELSHAN_GO-181717?style=flat-square&logo=github)](https://github.com/ELSHAN-GO) |
| **02** | Ehsan Fazli | Full-Stack / DevOps | [![GitHub](https://img.shields.io/badge/TssHack-181717?style=flat-square&logo=github)](https://github.com/TssHack) |
| **03** | Amirmahdi Shahbazi | Linux / AI / Game Development | [![GitHub](https://img.shields.io/badge/amirmwhdi-181717?style=flat-square&logo=github)](https://github.com/amirmwhdi) |

---

<div align="center">
  <i>"The only way to do great work is to love what you do."</i>
  <br>
  <sub>Parvan</sub>
</div>
