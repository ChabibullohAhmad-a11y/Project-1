import { useFinance } from '../../App'

const NAV_ITEMS = [
  {
    view: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    view: 'analytics',
    label: 'Analytics',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    view: 'budgets',
    label: 'Budgets',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const { activeView, setActiveView } = useFinance()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-brand-border min-h-[calc(100vh-4rem)] pt-6 px-3">
        <nav className="space-y-1">
          {NAV_ITEMS.map(({ view, label, icon }) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeView === view
                  ? 'bg-brand-purple text-white shadow-purple'
                  : 'text-brand-muted hover:bg-brand-border hover:text-brand-dark'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-card border-t border-brand-border flex">
        {NAV_ITEMS.map(({ view, label, icon }) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors duration-150 ${
              activeView === view
                ? 'text-brand-purple'
                : 'text-brand-muted'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </>
  )
}
