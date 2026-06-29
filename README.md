# FinTrack — Personal Finance & Expense Tracker Dashboard

> A zero-friction, browser-native personal finance dashboard built with React + Vite. No account required. No backend. Your data stays in your browser.

![FinTrack Dashboard](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-8884D8)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

- **Transaction Logging** — Add income and expense entries with category, date, and description
- **Full Client-Side Validation** — Field-level error messages, prevents bad data
- **Analytics Dashboard** — Doughnut chart for expense breakdown, bar chart for 6-month income/expense trends
- **Monthly Budget Manager** — Set per-category spending limits with visual progress bar health indicators (green/yellow/red thresholds)
- **Advanced Filtering** — Search by description, filter by month, sort by date/amount/category
- **Export to CSV** — Download your transaction history compatible with Excel & Google Sheets
- **LocalStorage Persistence** — Data survives page refreshes, no account needed
- **Fully Responsive** — Optimized for mobile (375px) through desktop (1440px)

## 🧠 Technical Highlights

- `useMemo` memoization on all derived data (filtered lists, chart data, category totals, budget health)
- Modular component architecture (14+ components, each under 150 lines)
- Custom Tailwind design tokens for a cohesive brand palette
- Zero magic numbers — all constants centralized in `src/constants/`
- LocalStorage read/write wrapped in try/catch for graceful degradation

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/          # Recharts visualizations
│   ├── budget/          # Budget manager + health panel
│   ├── forms/           # Transaction form with validation
│   ├── layout/          # Header, sidebar, view routers
│   └── transactions/    # Summary cards, list, controls
├── constants/           # Brand colors, categories, sort options
├── store/               # Central state hook (useFinanceStore)
├── utils/               # Formatters, storage helpers, CSV export
└── App.jsx              # Context provider + view routing
```

## 🎨 Design System

| Role             | Hex       |
| ---------------- | --------- |
| Background       | `#fceed1` |
| Primary (Purple) | `#7d3cff` |
| Warning (Yellow) | `#f2d53c` |
| Alert (Red)      | `#c80e13` |

## 📄 Documentation

See [`PRD.md`](./PRD.md) for the full Product Requirement Document including user journeys, feature scope, technical stack rationale, and data schema.

---

_Built as a front-end engineering portfolio project demonstrating React architecture, JavaScript array manipulation, and data visualization._

# FinTrack — Personal Finance & Expense Tracker Dashboard

🚀 🚀 **Live Demo:** [Kunjungi FinTrack](https://project-1-ebon-six.vercel.app)
