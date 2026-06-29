import { createContext, useContext } from 'react'
import { useFinanceStore } from './store/useFinanceStore'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import DashboardView from './components/layout/DashboardView'
import AnalyticsView from './components/layout/AnalyticsView'
import BudgetsView from './components/layout/BudgetsView'

// ─── Finance Context ──────────────────────────────────────────────────────────
const FinanceContext = createContext(null)

export const useFinance = () => {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance must be used within FinanceContext.Provider')
  return ctx
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const store = useFinanceStore()

  const renderActiveView = () => {
    switch (store.activeView) {
      case 'analytics':
        return <AnalyticsView />
      case 'budgets':
        return <BudgetsView />
      case 'dashboard':
      default:
        return <DashboardView />
    }
  }

  return (
    <FinanceContext.Provider value={store}>
      <div className="min-h-screen bg-brand-bg">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-w-0 p-4 lg:p-6 pb-20 lg:pb-6">
            <div className="max-w-6xl mx-auto animate-fade-in">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </div>
    </FinanceContext.Provider>
  )
}
