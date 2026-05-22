# RepositorIA 🤖

RepositorIA is a professional, high-performance technical asset repository built for engineers and architects. It features a minimalist **Dark Matte** aesthetic with technical neon accents, providing a streamlined experience for discovering and managing tools across different engineering domains.

## 🚀 Key Features

- **Technical Hierarchy Engine**: Organize assets by Engineering Pillars (Study, Work, Business) and Technical Units.
- **Smart Discovery**: Real-time global search with accent normalization (ignores tildes and common typos).
- **Minimalist UX**: 
  - Hover-based dropdowns for technical categories to reduce visual clutter.
  - Sidebar-integrated navigation for structural management.
  - Zero-static layout: everything responds to user interaction.
- **Asset Management**: Unified registry for technical tools with support for Base64 image uploads (no external URL dependencies).
- **Performance Optimized**: Built with Vite + React + TypeScript, ensuring minimal bundle size and rapid HMR.

## 🛠️ Tech Stack

- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Dark Matte Theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Persistence**: Local Storage Service Layer

## 📂 Project Structure

```text
src/
├── assets/             # Static visual assets
├── components/         # Reusable UI components (Navbar, ToolCard, etc.)
├── data/               # Initial seed data for the repository
├── pages/              # Main view components (Dashboard, Category Engine)
├── services/           # Business logic & persistence layers
├── types/              # TypeScript interfaces and type definitions
├── utils/              # Helper functions (Normalization, etc.)
└── App.tsx             # Root application logic
```

## ⚙️ Installation & Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Execution
Start the development server:
```bash
npm run dev
```

### Build for Production
Generate a production-ready build in the `dist/` directory:
```bash
npm run build
```

## 🌐 Deployment

The project is configured for automated deployment via GitHub Actions (see `.github/workflows/deploy.yml`). It can be hosted on platforms like Vercel, Netlify, or GitHub Pages.

### Manual Deployment
Upload the contents of the `dist/` folder to any static hosting provider.

---

**Developed for the next generation of technical repository management.**
