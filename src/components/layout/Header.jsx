import { useFinance } from '../../App'
import { formatMonthYear } from '../../utils/formatters'

export default function Header() {
  const { selectedMonth, availableMonths, setSelectedMonth } = useFinance()

  return (
    <header className="sticky top-0 z-40 bg-brand-bg border-b border-brand-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center shadow-purple">
            <span className="text-white text-sm font-bold">₣</span>
          </div>
          <span className="font-extrabold text-brand-dark text-lg tracking-tight">
            Fin<span className="text-brand-purple">Track</span>
          </span>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="month-select" className="text-sm font-medium text-brand-muted hidden sm:block">
            Viewing:
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-input !w-auto text-sm font-semibold py-1.5 cursor-pointer"
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {formatMonthYear(month + '-01')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
