import SummaryCards from '../transactions/SummaryCards'
import TransactionForm from '../forms/TransactionForm'
import TransactionControls from '../transactions/TransactionControls'
import TransactionList from '../transactions/TransactionList'

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Transaction Form */}
        <div className="xl:col-span-2">
          <TransactionForm />
        </div>

        {/* Transaction List */}
        <div className="xl:col-span-3 space-y-3">
          <TransactionControls />
          <TransactionList />
        </div>
      </div>
    </div>
  )
}
