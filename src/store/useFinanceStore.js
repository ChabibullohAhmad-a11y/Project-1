import { useState, useMemo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  loadTransactions,
  saveTransactions,
  loadBudgets,
  saveBudgets,
} from '../utils/storage'
import {
  getMonthKey,
  getCurrentMonthKey,
  getLastNMonthKeys,
} from '../utils/formatters'
import {
  TRANSACTION_TYPES,
  EXPENSE_CATEGORIES,
  CHART_COLORS,
} from '../constants'

/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {number} amount
 * @property {'income'|'expense'} type
 * @property {string} category
 * @property {string} date - YYYY-MM-DD
 * @property {string} description
 * @property {string} createdAt - ISO timestamp
 */

/**
 * Central finance state hook.
 * All expensive derived values are wrapped in useMemo to prevent unnecessary re-renders.
 */
export const useFinanceStore = () => {
  // ─── Raw State ──────────────────────────────────────────────────────────────
  const [transactions, setTransactions] = useState(() => loadTransactions())
  const [budgets, setBudgets] = useState(() => loadBudgets())
  const [selectedMonth, setSelectedMonth] = useState(() => getCurrentMonthKey())
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('date_desc')
  const [activeView, setActiveView] = useState('dashboard') // 'dashboard' | 'analytics' | 'budgets'

  // ─── Actions ────────────────────────────────────────────────────────────────

  const addTransaction = useCallback((transactionData) => {
    const newTransaction = {
      id: uuidv4(),
      ...transactionData,
      amount: parseFloat(transactionData.amount),
      createdAt: new Date().toISOString(),
    }
    setTransactions((prev) => {
      const updated = [newTransaction, ...prev]
      saveTransactions(updated)
      return updated
    })
  }, [])

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => {
      const updated = prev.filter((tx) => tx.id !== id)
      saveTransactions(updated)
      return updated
    })
  }, [])

  const updateBudget = useCallback((category, limit) => {
    setBudgets((prev) => {
      const updated = { ...prev, [category]: parseFloat(limit) || 0 }
      saveBudgets(updated)
      return updated
    })
  }, [])

  // ─── Derived: Filtered Transactions (current month + search) ────────────────
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(
      (tx) => getMonthKey(tx.date) === selectedMonth
    )

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [transactions, selectedMonth, searchQuery])

  // ─── Derived: Sorted Transactions ───────────────────────────────────────────
  const sortedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions]
    switch (sortOption) {
      case 'date_asc':
        return sorted.sort((a, b) => a.date.localeCompare(b.date))
      case 'amount_desc':
        return sorted.sort((a, b) => b.amount - a.amount)
      case 'amount_asc':
        return sorted.sort((a, b) => a.amount - b.amount)
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category))
      case 'date_desc':
      default:
        return sorted.sort((a, b) => b.date.localeCompare(a.date))
    }
  }, [filteredTransactions, sortOption])

  // ─── Derived: Monthly Summary ────────────────────────────────────────────────
  const monthlySummary = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, tx) => {
        if (tx.type === TRANSACTION_TYPES.INCOME) {
          acc.totalIncome += tx.amount
        } else {
          acc.totalExpense += tx.amount
        }
        return acc
      },
      { totalIncome: 0, totalExpense: 0 }
    )
  }, [filteredTransactions])

  const netBalance = useMemo(
    () => monthlySummary.totalIncome - monthlySummary.totalExpense,
    [monthlySummary]
  )

  // ─── Derived: Expense Breakdown by Category (for Doughnut Chart) ───────────
  const expenseByCategory = useMemo(() => {
    const expenseMap = filteredTransactions
      .filter((tx) => tx.type === TRANSACTION_TYPES.EXPENSE)
      .reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount
        return acc
      }, {})

    return Object.entries(expenseMap)
      .map(([name, value], index) => ({
        name,
        value: parseFloat(value.toFixed(2)),
        color: CHART_COLORS[index % CHART_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value)
  }, [filteredTransactions])

  // ─── Derived: Income vs Expense Trend (last 6 months, for Bar Chart) ────────
  const monthlyTrend = useMemo(() => {
    const monthKeys = getLastNMonthKeys(6)
    return monthKeys.map((monthKey) => {
      const monthTransactions = transactions.filter(
        (tx) => getMonthKey(tx.date) === monthKey
      )
      const income = monthTransactions
        .filter((tx) => tx.type === TRANSACTION_TYPES.INCOME)
        .reduce((sum, tx) => sum + tx.amount, 0)
      const expense = monthTransactions
        .filter((tx) => tx.type === TRANSACTION_TYPES.EXPENSE)
        .reduce((sum, tx) => sum + tx.amount, 0)

      const [year, month] = monthKey.split('-')
      const label = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString(
        'en-US',
        { month: 'short', year: '2-digit' }
      )
      return {
        month: label,
        monthKey,
        income: parseFloat(income.toFixed(2)),
        expense: parseFloat(expense.toFixed(2)),
      }
    })
  }, [transactions])

  // ─── Derived: Budget Health per Category ────────────────────────────────────
  const budgetHealth = useMemo(() => {
    return EXPENSE_CATEGORIES.map((category) => {
      const spent = filteredTransactions
        .filter(
          (tx) =>
            tx.type === TRANSACTION_TYPES.EXPENSE && tx.category === category
        )
        .reduce((sum, tx) => sum + tx.amount, 0)

      const limit = budgets[category] || 0
      const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0
      const isOverBudget = limit > 0 && spent > limit
      const isCritical = percentage >= 80
      const isWarning = percentage >= 60 && percentage < 80

      return {
        category,
        spent: parseFloat(spent.toFixed(2)),
        limit,
        percentage: parseFloat(percentage.toFixed(1)),
        isOverBudget,
        isCritical,
        isWarning,
        remaining: Math.max(limit - spent, 0),
      }
    })
  }, [filteredTransactions, budgets])

  // ─── Derived: Available Month Options (from transaction history) ─────────────
  const availableMonths = useMemo(() => {
    const monthSet = new Set(transactions.map((tx) => getMonthKey(tx.date)))
    const currentMonth = getCurrentMonthKey()
    monthSet.add(currentMonth)
    return Array.from(monthSet).sort().reverse()
  }, [transactions])

  return {
    // State
    transactions,
    budgets,
    selectedMonth,
    searchQuery,
    sortOption,
    activeView,

    // Actions
    addTransaction,
    deleteTransaction,
    updateBudget,
    setSelectedMonth,
    setSearchQuery,
    setSortOption,
    setActiveView,

    // Derived
    sortedTransactions,
    monthlySummary,
    netBalance,
    expenseByCategory,
    monthlyTrend,
    budgetHealth,
    availableMonths,
    transactionCount: filteredTransactions.length,
  }
}
