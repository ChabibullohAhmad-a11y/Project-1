# Product Requirement Document (PRD)
## Personal Finance & Expense Tracker Dashboard

**Version:** 1.0.0
**Author:** Portfolio Project
**Status:** Active Development
**Last Updated:** June 2026

---

## Table of Contents

1. [Project Overview & Objective](#1-project-overview--objective)
2. [Target Users & Problem Statement](#2-target-users--problem-statement)
3. [User Journey & Flow](#3-user-journey--flow)
4. [Core Features Scope](#4-core-features-scope)
5. [Technical Stack Rationale](#5-technical-stack-rationale)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [UI/UX Design Specifications](#8-uiux-design-specifications)
9. [Data Schema](#9-data-schema)
10. [Success Metrics](#10-success-metrics)

---

## 1. Project Overview & Objective

### The Problem

The average person has no single, lightweight place to track where their money actually goes. Full-featured apps like Mint or YNAB are bloated with bank syncs, subscription paywalls, and notification noise. Spreadsheets are powerful but cold — they demand manual discipline with no visual feedback. The gap between "too much app" and "too much spreadsheet" is where most people fall off their budgeting habits entirely.

### The Solution

**FinTrack** is a zero-friction, browser-native personal finance dashboard that lives entirely in your browser. No account creation, no bank linking, no subscription. You open it, log what you spent, and immediately see your financial picture rendered clearly through interactive charts and category-level budget health indicators.

### Core Objective

Build a high-performance, client-side React application that demonstrates:
- Mastery of advanced JavaScript array manipulation (filtering, reducing, sorting, grouping)
- Clean, scalable component architecture and state management
- Production-grade data visualization with interactive charts
- Thoughtful UX design that makes financial data feel approachable, not anxiety-inducing

---

## 2. Target Users & Problem Statement

### Primary User Persona

**Alex, 23, Recent Graduate / Intern**
- Earns a monthly salary or stipend
- Wants to build healthy budgeting habits without committing to a paid app
- Comfortable with browsers, not interested in installing native software
- Needs visual feedback to stay motivated (progress bars, trend charts)

### Secondary User Persona

**Sam, 30, Freelancer**
- Has irregular income from multiple clients
- Needs to track income vs. expenses month-to-month
- Wants to export data to CSV for tax-time accounting

### Problem Statements

| # | User Need | Current Pain Point |
|---|-----------|-------------------|
| 1 | Log a transaction in under 10 seconds | Most apps require too many steps or account linking |
| 2 | Instantly understand where money went | Raw numbers in a list are hard to interpret |
| 3 | Know when approaching a budget limit | No early warning system in spreadsheets |
| 4 | Export data for external use | Browser apps usually trap data inside |
| 5 | Pick up where they left off (persistence) | Page refreshes reset everything in basic apps |

---

## 3. User Journey & Flow

### Primary Flow: Logging a Transaction

```
[1. Open App]
      │
      ▼
[2. View Dashboard Summary]
   (Net balance, monthly totals visible immediately)
      │
      ▼
[3. Click "+ Add Transaction"]
      │
      ▼
[4. Fill Transaction Form]
   - Amount (required, number > 0)
   - Type: Income / Expense (toggle)
   - Category (dropdown: Food, Transport, Utilities, etc.)
   - Date (date picker, defaults to today)
   - Description (optional short note)
      │
      ▼
[5. Client-Side Validation]
   ├── Pass → Transaction saved to state + LocalStorage
   └── Fail → Inline field-level error messages shown
      │
      ▼
[6. Dashboard Updates Instantly]
   - Transaction list updates
   - Summary cards recalculate
   - Charts re-render with new data
   - Budget progress bars update
```

### Secondary Flow: Analyzing Financial Health

```
[1. Navigate to Analytics Tab / Section]
      │
      ▼
[2. View Doughnut Chart]
   (Expense breakdown by category for selected month)
      │
      ▼
[3. View Bar/Line Chart]
   (Income vs. Expense trend over last 6 months)
      │
      ▼
[4. Filter Transactions]
   - Search by description keyword
   - Filter by date range or month
   - Sort by: Amount (High→Low), Date (New→Old), Category
      │
      ▼
[5. Review Budget Health]
   - Per-category progress bars
   - Green (< 60%) → Yellow (60–80%) → Red (> 80% = critical)
```

### Tertiary Flow: Exporting Data

```
[1. Click "Export CSV" Button]
      │
      ▼
[2. All filtered/current transactions converted to CSV string]
      │
      ▼
[3. Browser triggers file download]
   → "fintrack_transactions_YYYY-MM.csv" saved locally
      │
      ▼
[4. File opens correctly in Excel / Google Sheets]
```

---

## 4. Core Features Scope

### ✅ In Scope (v1.0)

| Feature | Description | Priority |
|---------|-------------|----------|
| **Transaction Form** | Add income/expense with amount, category, type, date, description | P0 |
| **Form Validation** | Client-side validation with field-level error messages | P0 |
| **LocalStorage Persistence** | All transactions and budget settings survive page refresh | P0 |
| **Summary Cards** | Total Income, Total Expense, Net Balance for current month | P0 |
| **Transaction List** | Paginated, sortable list of all logged transactions | P0 |
| **Search & Filter** | Search by description; filter by month; sort by amount/date/category | P1 |
| **Doughnut Chart** | Expense breakdown by category using brand color palette | P1 |
| **Line/Bar Chart** | Income vs. expense trends over the last 6 months | P1 |
| **Budget Manager** | Set per-category monthly budget limits | P1 |
| **Budget Progress Bars** | Visual health indicator per category (green/yellow/red thresholds) | P1 |
| **Export to CSV** | Download all transactions as a .csv file | P2 |
| **Delete Transaction** | Remove a transaction from the list | P1 |
| **Responsive Design** | Fully usable on mobile (375px) through desktop (1440px) | P0 |

### ❌ Out of Scope (v1.0)

| Feature | Reason for Exclusion |
|---------|----------------------|
| User authentication / accounts | Adds backend complexity; out of scope for client-only app |
| Bank / financial institution sync | Requires third-party API (Plaid), sensitive regulatory territory |
| Recurring transaction automation | Increases state complexity; planned for v2 |
| Multi-currency support | Scope creep; adds conversion logic overhead |
| PDF report export | PDF generation in-browser has library size tradeoffs |
| Push / email notifications | Requires service workers or backend |
| Dark mode | Deferred to v2; branding palette is optimized for light mode |
| Data encryption at rest | LocalStorage is not encrypted by design; out of scope |

---

## 5. Technical Stack Rationale

### React.js (via Vite)

**Why React?**
React's component model maps directly onto the modular nature of a dashboard — each card, chart, form, and filter is a self-contained unit of UI. The declarative paradigm means that when state updates (e.g., a new transaction is added), the UI re-renders automatically and predictably without manual DOM manipulation.

**Why Vite over CRA?**
Vite offers near-instant hot module replacement (HMR) and builds dramatically faster than Create React App via its native ES module dev server. For a portfolio project, this signals awareness of modern tooling.

### Tailwind CSS

**Why Tailwind?**
Utility-first CSS eliminates the cognitive overhead of naming classes and prevents style conflicts. It co-locates styling with structure, making components self-documenting. The `tailwind.config.js` file allows our custom brand palette to be registered as first-class design tokens, ensuring consistency across every component without a separate design system.

### React Hooks (`useState`, `useMemo`, `useCallback`)

**Why Hooks over a library like Redux?**
The application's state is a single source of truth: an array of transactions and a budget config object. This is a textbook use case for `useState` with `useMemo` memoization for derived values (monthly totals, category breakdowns, filtered lists). Reaching for Redux or Zustand at this complexity would be over-engineering, and interviewers recognize that choosing the right-sized tool is itself a senior skill.

**`useMemo` is critical** for performance: category reduction over hundreds of transactions on every keystroke would otherwise cause noticeable lag.

### Recharts

**Why Recharts over Chart.js?**
Recharts is built natively for React — its charts are actual React components with props, not imperative canvas operations wrapped in `useEffect`. This means charts participate in React's rendering lifecycle naturally, are easier to restyle via props, and integrate cleanly with the component tree. Chart.js, while powerful, requires refs and imperative lifecycle management in React, which is an antipattern.

### LocalStorage

**Why LocalStorage over a backend?**
This is a portfolio project demonstrating frontend skills. Adding a backend (Node, Supabase, Firebase) would shift focus away from the JavaScript and React architecture being showcased. LocalStorage is the correct, minimal persistence layer for a fully client-side app and demonstrates understanding of browser APIs.

---

## 6. Functional Requirements

### FR-1: Transaction Management

| ID | Requirement |
|----|-------------|
| FR-1.1 | User can add a transaction with: amount (positive number), type (Income/Expense), category, date, description |
| FR-1.2 | Amount field must reject non-numeric and zero/negative values |
| FR-1.3 | Category must be selected from a predefined list |
| FR-1.4 | Date defaults to today's date but is editable |
| FR-1.5 | Each transaction is assigned a unique UUID on creation |
| FR-1.6 | User can delete any transaction with a confirmation step |
| FR-1.7 | All transactions persist in LocalStorage under key `fintrack_transactions` |

### FR-2: Dashboard & Summary

| ID | Requirement |
|----|-------------|
| FR-2.1 | Summary cards display: Total Income, Total Expense, Net Balance for the current calendar month |
| FR-2.2 | Net Balance is color-coded: green if positive, red if negative |
| FR-2.3 | Transaction count for the current month is displayed |

### FR-3: Search, Filter & Sort

| ID | Requirement |
|----|-------------|
| FR-3.1 | Search bar filters the transaction list by description (case-insensitive) |
| FR-3.2 | Month selector filters all data (list + charts) to a specific month |
| FR-3.3 | Sort options: Newest First, Oldest First, Highest Amount, Lowest Amount |
| FR-3.4 | All filters can be applied simultaneously |
| FR-3.5 | Filter/sort state resets when month selection changes |

### FR-4: Charts & Analytics

| ID | Requirement |
|----|-------------|
| FR-4.1 | Doughnut chart shows expense distribution by category for selected month |
| FR-4.2 | Bar chart shows total income vs. total expense for the last 6 months |
| FR-4.3 | Charts update reactively when transactions are added or deleted |
| FR-4.4 | Charts display an empty state message when no data is available |
| FR-4.5 | Chart colors use the brand palette and its tonal variations |

### FR-5: Budget Management

| ID | Requirement |
|----|-------------|
| FR-5.1 | User can set a monthly budget limit (in currency units) for each expense category |
| FR-5.2 | Budget limits persist in LocalStorage under key `fintrack_budgets` |
| FR-5.3 | Progress bars show spending as a percentage of budget per category |
| FR-5.4 | Progress bar is green when < 60% spent |
| FR-5.5 | Progress bar turns yellow (#f2d53c) when 60–80% spent |
| FR-5.6 | Progress bar turns red (#c80e13) when > 80% spent |
| FR-5.7 | A visual warning label appears when any category exceeds 80% |

### FR-6: Export

| ID | Requirement |
|----|-------------|
| FR-6.1 | "Export CSV" button downloads all transactions as a .csv file |
| FR-6.2 | CSV columns: Date, Description, Category, Type, Amount |
| FR-6.3 | Filename follows the pattern: `fintrack_transactions_YYYY-MM-DD.csv` |
| FR-6.4 | CSV is compatible with Microsoft Excel and Google Sheets |

---

## 7. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | `useMemo` used for all derived data (filtered lists, chart data, totals). Re-renders scoped to affected components only. |
| **Responsiveness** | Layout adapts from 375px (mobile) to 1440px (desktop). Charts reflow gracefully. |
| **Accessibility** | Form inputs have associated labels. Color is not the sole indicator of state (text labels supplement color-coded bars). |
| **Code Quality** | Components < 150 lines each. Descriptive naming. No magic numbers — constants extracted to `constants/` directory. |
| **Bundle Size** | Vite production build. Only used Recharts chart types imported (tree-shaking). |
| **Error Handling** | LocalStorage read/write wrapped in try/catch. Malformed stored data gracefully reset. |

---

## 8. UI/UX Design Specifications

### Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Warm Tan | `#fceed1` | Main app background, card backgrounds |
| Primary Accent | Deep Purple | `#7d3cff` | Primary buttons, active states, links, chart color 1 |
| Secondary Accent | Vivid Yellow | `#f2d53c` | Highlights, warning progress bars, chart color 2 |
| Alert / Critical | Alert Red | `#c80e13` | Errors, delete actions, over-budget indicators, chart color 3 |
| Text Primary | Near-black | `#1a1a2e` | Body text, headings |
| Text Secondary | Warm Gray | `#6b6b80` | Labels, captions, secondary info |
| Success | Soft Green | `#22c55e` | Positive balance, healthy budget bars |

### Typography

- **Display / Headings:** System sans-serif stack, weight 700–800, tracking tight
- **Body / Labels:** System sans-serif, weight 400–500, comfortable line-height
- **Numbers / Data:** Monospace or tabular-nums to prevent layout shift on updates

### Component Design Tokens

- **Border Radius:** `0.75rem` (cards), `0.5rem` (inputs, buttons), `9999px` (pills, badges)
- **Shadow:** Subtle `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` on cards
- **Transitions:** `150ms ease` for hover states, `200ms ease` for progress bars
- **Spacing Scale:** 4px base unit (Tailwind default)

---

## 9. Data Schema

### Transaction Object

```typescript
interface Transaction {
  id: string;           // UUID v4
  amount: number;       // Positive float
  type: 'income' | 'expense';
  category: TransactionCategory;
  date: string;         // ISO 8601: "YYYY-MM-DD"
  description: string;  // Max 100 characters
  createdAt: string;    // ISO 8601 timestamp
}
```

### Budget Config Object

```typescript
interface BudgetConfig {
  [category: string]: number;  // Category name → monthly limit in currency units
}
```

### Transaction Categories

```typescript
type TransactionCategory =
  | 'Food & Dining'
  | 'Transport'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Education'
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Other';
```

### LocalStorage Keys

| Key | Value Type | Description |
|-----|-----------|-------------|
| `fintrack_transactions` | `Transaction[]` (JSON) | All user transactions |
| `fintrack_budgets` | `BudgetConfig` (JSON) | Per-category monthly budgets |

---

## 10. Success Metrics

Since this is a portfolio project, success is measured across two dimensions:

### Technical Quality Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance Score | ≥ 90 |
| Lighthouse Accessibility Score | ≥ 85 |
| Component count (modular) | ≥ 12 distinct components |
| Zero `any` type usage (if TypeScript migrated) | 100% |
| `useMemo` coverage on derived data | All expensive computations |
| LocalStorage persistence | 100% — no data loss on refresh |

### Portfolio Impact Metrics

| Signal | Goal |
|--------|------|
| GitHub README clarity | Recruiter understands the project in 30 seconds |
| PRD inclusion | Demonstrates product thinking beyond pure coding |
| Code readability | Another developer can navigate without explanation |
| Feature completeness | All P0 and P1 features shipped in v1.0 |
| Visual polish | UI screenshots look portfolio-worthy at first glance |

---

## Appendix: Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | June 2026 | Initial PRD — full v1.0 scope defined |

---

*This PRD was written as part of a front-end engineering internship portfolio project. It intentionally follows the product management methodology used at modern software companies to demonstrate cross-functional awareness alongside technical execution.*
