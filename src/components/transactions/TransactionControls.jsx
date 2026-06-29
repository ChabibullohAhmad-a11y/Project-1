import { useFinance } from '../../App'
import { downloadTransactionsCsv } from '../../utils/csvExport'
import { SORT_OPTIONS } from '../../constants'

export default function TransactionControls() {
  const {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    sortedTransactions,
    transactionCount,
  } = useFinance()

  const handleExport = () => {
    downloadTransactionsCsv(sortedTransactions)
  }

  return (
    <div className="card p-3 flex flex-col sm:flex-row gap-2.5">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={`Search ${transactionCount} transaction${transactionCount !== 1 ? 's' : ''}…`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input pl-9 text-sm py-2"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Sort */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="form-input !w-auto text-sm py-2"
        aria-label="Sort transactions"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Export */}
      <button
        onClick={handleExport}
        disabled={sortedTransactions.length === 0}
        title="Export visible transactions to CSV"
        className="btn-secondary text-sm py-2 px-3 flex items-center gap-1.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="hidden sm:inline">Export CSV</span>
      </button>
    </div>
  )
}
