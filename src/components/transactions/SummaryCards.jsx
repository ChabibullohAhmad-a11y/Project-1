import { useFinance } from '../../App'
import { formatCurrency, formatMonthYear } from '../../utils/formatters'

const StatCard = ({ label, value, valueColor, icon, subtitle }) => (
  <div className="card p-5 animate-slide-up">
    <div className="flex items-start justify-between mb-3">
      <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">{label}</p>
      <span className="text-xl">{icon}</span>
    </div>
    <p className={`text-2xl font-extrabold font-mono tracking-tight ${valueColor}`}>
      {value}
    </p>
    {subtitle && (
      <p className="text-xs text-brand-muted mt-1">{subtitle}</p>
    )}
  </div>
)

export default function SummaryCards() {
  const { monthlySummary, netBalance, transactionCount, selectedMonth } = useFinance()

  const { totalIncome, totalExpense } = monthlySummary
  const monthLabel = formatMonthYear(selectedMonth + '-01')

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Net Balance"
        value={formatCurrency(netBalance)}
        valueColor={netBalance >= 0 ? 'text-green-600' : 'text-brand-red'}
        icon="💰"
        subtitle={monthLabel}
      />
      <StatCard
        label="Total Income"
        value={formatCurrency(totalIncome)}
        valueColor="text-green-600"
        icon="📈"
        subtitle={`${monthLabel}`}
      />
      <StatCard
        label="Total Expense"
        value={formatCurrency(totalExpense)}
        valueColor="text-brand-red"
        icon="📉"
        subtitle={`${monthLabel}`}
      />
      <StatCard
        label="Transactions"
        value={transactionCount}
        valueColor="text-brand-purple"
        icon="📋"
        subtitle={`in ${monthLabel}`}
      />
    </div>
  )
}
