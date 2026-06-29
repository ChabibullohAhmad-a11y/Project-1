import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useFinance } from '../../App'
import { formatCurrency } from '../../utils/formatters'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value, color } = payload[0].payload
  return (
    <div className="bg-brand-card border border-brand-border rounded-lg p-3 shadow-card-hover text-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
        <span className="font-semibold text-brand-dark">{name}</span>
      </div>
      <p className="text-brand-muted font-mono font-medium">{formatCurrency(value)}</p>
    </div>
  )
}

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      className="text-xs font-bold" style={{ fontSize: 11, fontWeight: 700 }}>
      {(percent * 100).toFixed(0)}%
    </text>
  )
}

export default function ExpenseDonutChart() {
  const { expenseByCategory, monthlySummary } = useFinance()

  return (
    <div className="card p-5">
      <h3 className="text-sm font-bold text-brand-dark mb-1">Expense Breakdown</h3>
      <p className="text-xs text-brand-muted mb-4">Spending by category this month</p>

      {expenseByCategory.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-2">🎉</span>
          <p className="font-semibold text-brand-dark text-sm">No expenses this month</p>
          <p className="text-xs text-brand-muted mt-1">Add expenses to see your breakdown.</p>
        </div>
      ) : (
        <>
          {/* Center Total */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {expenseByCategory.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ color: '#1a1a2e', fontSize: 12, fontWeight: 500 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingBottom: 40 }}>
              <div className="text-center">
                <p className="text-xs text-brand-muted font-medium">Total Spent</p>
                <p className="text-lg font-extrabold font-mono text-brand-dark">
                  {formatCurrency(monthlySummary.totalExpense)}
                </p>
              </div>
            </div>
          </div>

          {/* Category Legend with amounts */}
          <div className="space-y-1.5 mt-2">
            {expenseByCategory.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-brand-dark font-medium">{item.name}</span>
                </div>
                <span className="font-mono text-brand-muted">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
