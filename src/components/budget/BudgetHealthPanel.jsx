import { useFinance } from '../../App'
import { formatCurrency } from '../../utils/formatters'
import { CATEGORY_ICONS, BUDGET_THRESHOLDS } from '../../constants'

const getBarColor = (percentage) => {
  if (percentage >= BUDGET_THRESHOLDS.CRITICAL) return 'bg-brand-red'
  if (percentage >= BUDGET_THRESHOLDS.WARNING) return 'bg-brand-yellow'
  return 'bg-green-500'
}

const getStatusLabel = (item) => {
  if (item.isOverBudget) return { text: 'Over Budget!', color: 'text-brand-red bg-red-50' }
  if (item.isCritical) return { text: 'Critical', color: 'text-brand-red bg-red-50' }
  if (item.isWarning) return { text: 'Warning', color: 'text-amber-700 bg-amber-50' }
  return null
}

const BudgetProgressBar = ({ item }) => {
  const barColor = getBarColor(item.percentage)
  const statusLabel = getStatusLabel(item)
  const icon = CATEGORY_ICONS[item.category] || '📦'
  const hasLimit = item.limit > 0

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-base shrink-0">{icon}</span>
          <span className="text-sm font-semibold text-brand-dark truncate">{item.category}</span>
          {statusLabel && (
            <span className={`badge text-xs shrink-0 ${statusLabel.color}`}>
              {statusLabel.text}
            </span>
          )}
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-mono text-brand-dark font-semibold">
            {formatCurrency(item.spent)}
          </span>
          {hasLimit && (
            <span className="text-xs text-brand-muted font-mono">
              {' '}/ {formatCurrency(item.limit)}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-brand-border rounded-full overflow-hidden">
        {hasLimit ? (
          <div
            className={`h-full rounded-full transition-all duration-500 animate-progress ${barColor}`}
            style={{ width: `${Math.min(item.percentage, 100)}%` }}
          />
        ) : (
          <div className="h-full rounded-full bg-brand-border/40" title="No budget set" />
        )}
      </div>

      {hasLimit && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-brand-muted">
            {item.percentage.toFixed(0)}% used
          </span>
          <span className="text-xs text-brand-muted">
            {item.isOverBudget
              ? `${formatCurrency(item.spent - item.limit)} over`
              : `${formatCurrency(item.remaining)} left`
            }
          </span>
        </div>
      )}
    </div>
  )
}

export default function BudgetHealthPanel() {
  const { budgetHealth } = useFinance()

  const categoriesWithSpending = budgetHealth.filter((b) => b.spent > 0 || b.limit > 0)
  const criticalCount = budgetHealth.filter((b) => b.isCritical).length

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-brand-dark">Budget Health</h3>
          <p className="text-xs text-brand-muted mt-0.5">Spending progress per category</p>
        </div>
        {criticalCount > 0 && (
          <span className="badge bg-red-100 text-brand-red">
            ⚠ {criticalCount} critical
          </span>
        )}
      </div>

      {categoriesWithSpending.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-3xl">💡</span>
          <p className="text-sm font-semibold text-brand-dark mt-2">Set budgets to track health</p>
          <p className="text-xs text-brand-muted mt-1">
            Use the panel on the left to set monthly limits per category.
          </p>
        </div>
      ) : (
        <div className="space-y-4 divide-y divide-brand-border">
          {budgetHealth.map((item) => (
            (item.spent > 0 || item.limit > 0) && (
              <div key={item.category} className="pt-4 first:pt-0">
                <BudgetProgressBar item={item} />
              </div>
            )
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-brand-border flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-brand-muted">
          <span className="w-3 h-2 rounded-sm bg-green-500" /> Under 60%
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-muted">
          <span className="w-3 h-2 rounded-sm bg-brand-yellow" /> 60–80%
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-muted">
          <span className="w-3 h-2 rounded-sm bg-brand-red" /> Over 80%
        </div>
      </div>
    </div>
  )
}
