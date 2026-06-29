import { useState } from 'react'
import { useFinance } from '../../App'
import { formatCurrency, formatDate, truncate } from '../../utils/formatters'
import { CATEGORY_ICONS, TRANSACTION_TYPES } from '../../constants'

const ITEMS_PER_PAGE = 8

const EmptyState = ({ hasSearch }) => (
  <div className="card p-12 text-center">
    <div className="text-4xl mb-3">{hasSearch ? '🔍' : '📭'}</div>
    <p className="font-semibold text-brand-dark">
      {hasSearch ? 'No matching transactions' : 'No transactions yet'}
    </p>
    <p className="text-sm text-brand-muted mt-1">
      {hasSearch ? 'Try a different search term.' : 'Add your first income or expense above.'}
    </p>
  </div>
)

const DeleteModal = ({ transaction, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
    <div className="card p-6 max-w-sm w-full animate-slide-up">
      <p className="font-bold text-brand-dark text-base mb-1">Delete Transaction?</p>
      <p className="text-sm text-brand-muted mb-4">
        This will permanently remove <strong>{truncate(transaction.description || transaction.category, 30)}</strong>.
      </p>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="btn-secondary text-sm">Cancel</button>
        <button onClick={onConfirm} className="btn-danger text-sm">Delete</button>
      </div>
    </div>
  </div>
)

const TransactionRow = ({ transaction, onDeleteClick }) => {
  const isExpense = transaction.type === TRANSACTION_TYPES.EXPENSE
  const icon = CATEGORY_ICONS[transaction.category] || '📦'

  return (
    <div className="flex items-center gap-3 py-3 px-4 hover:bg-brand-bg/60 rounded-lg transition-colors duration-100 group animate-slide-up">
      {/* Category Icon */}
      <div className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center shrink-0 text-lg border border-brand-border">
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-brand-dark truncate">
          {transaction.description || transaction.category}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="badge bg-brand-border text-brand-muted">
            {transaction.category}
          </span>
          <span className="text-xs text-brand-muted">{formatDate(transaction.date)}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="shrink-0 text-right">
        <p className={`text-sm font-bold font-mono ${isExpense ? 'text-brand-red' : 'text-green-600'}`}>
          {isExpense ? '−' : '+'}{formatCurrency(transaction.amount)}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDeleteClick(transaction)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-brand-muted hover:text-brand-red hover:bg-red-50 transition-all duration-150 shrink-0"
        aria-label={`Delete ${transaction.description || transaction.category}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}

export default function TransactionList() {
  const { sortedTransactions, deleteTransaction, searchQuery } = useFinance()
  const [page, setPage] = useState(1)
  const [toDelete, setToDelete] = useState(null)

  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE)
  const paginatedTransactions = sortedTransactions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const handleDeleteConfirm = () => {
    if (toDelete) {
      deleteTransaction(toDelete.id)
      setToDelete(null)
      // Reset to page 1 if current page becomes empty
      if (paginatedTransactions.length === 1 && page > 1) {
        setPage((p) => p - 1)
      }
    }
  }

  if (sortedTransactions.length === 0) {
    return <EmptyState hasSearch={!!searchQuery} />
  }

  return (
    <>
      <div className="card overflow-hidden divide-y divide-brand-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-brand-dark">Transactions</h3>
          <span className="text-xs text-brand-muted">
            {sortedTransactions.length} total
          </span>
        </div>

        <div className="divide-y divide-brand-border/60">
          {paginatedTransactions.map((tx) => (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              onDeleteClick={setToDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="text-xs btn-secondary py-1 px-2.5 disabled:opacity-40"
            >
              ← Prev
            </button>
            <span className="text-xs text-brand-muted">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="text-xs btn-secondary py-1 px-2.5 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {toDelete && (
        <DeleteModal
          transaction={toDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  )
}
