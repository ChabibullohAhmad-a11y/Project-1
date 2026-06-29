import BudgetManager from '../budget/BudgetManager'
import BudgetHealthPanel from '../budget/BudgetHealthPanel'
import { useFinance } from '../../App'
import { formatMonthYear } from '../../utils/formatters'

export default function BudgetsView() {
  const { selectedMonth } = useFinance()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-brand-dark">Budget Manager</h2>
        <p className="text-brand-muted text-sm mt-1">
          Set limits and track category health for {formatMonthYear(selectedMonth + '-01')}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BudgetManager />
        <BudgetHealthPanel />
      </div>
    </div>
  )
}
