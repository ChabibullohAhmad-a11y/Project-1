import ExpenseDonutChart from '../charts/ExpenseDonutChart'
import IncomeExpenseBarChart from '../charts/IncomeExpenseBarChart'
import { useFinance } from '../../App'
import { formatMonthYear } from '../../utils/formatters'

export default function AnalyticsView() {
  const { selectedMonth } = useFinance()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-brand-dark">Analytics</h2>
        <p className="text-brand-muted text-sm mt-1">
          Financial breakdown for {formatMonthYear(selectedMonth + '-01')}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ExpenseDonutChart />
        <IncomeExpenseBarChart />
      </div>
    </div>
  )
}
