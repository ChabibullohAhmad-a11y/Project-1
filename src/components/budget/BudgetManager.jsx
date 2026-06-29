import { useState } from 'react'
import { useFinance } from '../../App'
import { EXPENSE_CATEGORIES, CATEGORY_ICONS } from '../../constants'
import { formatCurrency } from '../../utils/formatters'

export default function BudgetManager() {
  const { budgets, updateBudget } = useFinance()
  const [editingCategory, setEditingCategory] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const handleEditStart = (category) => {
    setEditingCategory(category)
    setInputValue(budgets[category] ? String(budgets[category]) : '')
  }

  const handleSave = (category) => {
    const value = parseFloat(inputValue)
    if (!isNaN(value) && value >= 0) {
      updateBudget(category, value)
    }
    setEditingCategory(null)
    setInputValue('')
  }

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter') handleSave(category)
    if (e.key === 'Escape') setEditingCategory(null)
  }

  return (
    <div className="card p-5">
      <h3 className="text-sm font-bold text-brand-dark mb-1">Set Monthly Limits</h3>
      <p className="text-xs text-brand-muted mb-4">
        Click on a category to set or update its monthly budget.
      </p>

      <div className="space-y-2">
        {EXPENSE_CATEGORIES.map((category) => {
          const icon = CATEGORY_ICONS[category] || '📦'
          const limit = budgets[category] || 0
          const isEditing = editingCategory === category

          return (
            <div
              key={category}
              className="flex items-center gap-3 p-3 rounded-lg bg-brand-bg border border-brand-border hover:border-brand-purple/40 transition-colors duration-150"
            >
              <span className="text-lg shrink-0">{icon}</span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-dark">{category}</p>
                {!isEditing && (
                  <p className="text-xs text-brand-muted font-mono">
                    {limit > 0 ? formatCurrency(limit) + ' / month' : 'No limit set'}
                  </p>
                )}
              </div>

              {isEditing ? (
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, category)}
                      autoFocus
                      className="form-input !w-28 pl-6 text-sm py-1.5"
                      placeholder="0.00"
                    />
                  </div>
                  <button
                    onClick={() => handleSave(category)}
                    className="w-7 h-7 rounded-md bg-brand-purple text-white flex items-center justify-center hover:bg-purple-700 transition-colors"
                    aria-label="Save"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="w-7 h-7 rounded-md bg-brand-border text-brand-muted flex items-center justify-center hover:bg-red-100 hover:text-brand-red transition-colors"
                    aria-label="Cancel"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditStart(category)}
                  className="shrink-0 text-xs text-brand-purple font-semibold hover:underline"
                >
                  {limit > 0 ? 'Edit' : 'Set'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
