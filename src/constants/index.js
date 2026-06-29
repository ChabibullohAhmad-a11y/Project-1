// ─── Storage Keys ──────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  TRANSACTIONS: 'fintrack_transactions',
  BUDGETS: 'fintrack_budgets',
}

// ─── Brand Palette ─────────────────────────────────────────────────────────────
export const BRAND_COLORS = {
  purple: '#7d3cff',
  yellow: '#f2d53c',
  red: '#c80e13',
  bg: '#fceed1',
  dark: '#1a1a2e',
  muted: '#6b6b80',
  green: '#22c55e',
}

// ─── Chart Color Palette (brand-derived tonal variations) ──────────────────────
export const CHART_COLORS = [
  '#7d3cff', // brand purple
  '#f2d53c', // brand yellow
  '#c80e13', // brand red
  '#22c55e', // success green
  '#3b82f6', // blue
  '#f97316', // orange
  '#ec4899', // pink
  '#14b8a6', // teal
  '#8b5cf6', // violet
  '#a3e635', // lime
]

// ─── Expense Categories ────────────────────────────────────────────────────────
export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Other',
]

// ─── Income Categories ─────────────────────────────────────────────────────────
export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Other',
]

// ─── All Categories ────────────────────────────────────────────────────────────
export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

// ─── Budget Thresholds ─────────────────────────────────────────────────────────
export const BUDGET_THRESHOLDS = {
  WARNING: 60,   // Yellow
  CRITICAL: 80,  // Red
}

// ─── Sort Options ──────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Newest First' },
  { value: 'date_asc', label: 'Oldest First' },
  { value: 'amount_desc', label: 'Highest Amount' },
  { value: 'amount_asc', label: 'Lowest Amount' },
  { value: 'category', label: 'Category A–Z' },
]

// ─── Transaction Types ─────────────────────────────────────────────────────────
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
}

// ─── Category Icons (emoji) ────────────────────────────────────────────────────
export const CATEGORY_ICONS = {
  'Food & Dining': '🍽️',
  'Transport': '🚌',
  'Utilities': '⚡',
  'Entertainment': '🎬',
  'Healthcare': '🏥',
  'Shopping': '🛍️',
  'Education': '📚',
  'Salary': '💼',
  'Freelance': '💻',
  'Investment': '📈',
  'Gift': '🎁',
  'Other': '📦',
}
