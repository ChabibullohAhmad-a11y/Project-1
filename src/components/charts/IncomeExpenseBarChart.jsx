import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useFinance } from '../../App'
import { formatCurrency } from '../../utils/formatters'
import { BRAND_COLORS } from '../../constants'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-brand-card border border-brand-border rounded-lg p-3 shadow-card-hover text-sm min-w-[160px]">
      <p className="font-bold text-brand-dark mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: entry.fill }} />
            <span className="text-brand-muted capitalize">{entry.name}</span>
          </div>
          <span className="font-mono font-semibold" style={{ color: entry.fill }}>
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
      {payload.length === 2 && (
        <div className="border-t border-brand-border mt-2 pt-2 flex items-center justify-between">
          <span className="text-brand-muted text-xs">Net</span>
          <span className={`font-mono font-bold text-xs ${
            (payload[0]?.value - payload[1]?.value) >= 0
              ? 'text-green-600'
              : 'text-brand-red'
          }`}>
            {formatCurrency((payload[0]?.value || 0) - (payload[1]?.value || 0))}
          </span>
        </div>
      )}
    </div>
  )
}

export default function IncomeExpenseBarChart() {
  const { monthlyTrend } = useFinance()

  const hasData = monthlyTrend.some((m) => m.income > 0 || m.expense > 0)

  return (
    <div className="card p-5">
      <h3 className="text-sm font-bold text-brand-dark mb-1">Income vs. Expense Trend</h3>
      <p className="text-xs text-brand-muted mb-4">Monthly comparison over the last 6 months</p>

      {!hasData ? (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-2">📊</span>
          <p className="font-semibold text-brand-dark text-sm">No trend data yet</p>
          <p className="text-xs text-brand-muted mt-1">Add transactions to see trends over time.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyTrend}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            barGap={4}
            barSize={20}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e8d9b5"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: BRAND_COLORS.muted, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: BRAND_COLORS.muted }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(v >= 1000 ? 1 : 0)}${v >= 1000 ? 'k' : ''}`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(125,60,255,0.06)' }} />
            <Legend
              iconType="square"
              iconSize={10}
              formatter={(value) => (
                <span style={{ color: BRAND_COLORS.dark, fontSize: 12, fontWeight: 500, textTransform: 'capitalize' }}>
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="income"
              name="income"
              fill={BRAND_COLORS.green}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="expense"
              fill={BRAND_COLORS.red}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
