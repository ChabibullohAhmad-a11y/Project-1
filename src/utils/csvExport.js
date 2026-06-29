import { getTodayIso } from './formatters'

/**
 * Convert an array of transactions to a CSV string.
 * @param {import('../store/useFinanceStore').Transaction[]} transactions
 */
const transactionsToCsv = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']

  const rows = transactions.map((tx) => [
    tx.date,
    `"${tx.description.replace(/"/g, '""')}"`, // escape quotes
    tx.category,
    tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
    tx.type === 'expense' ? `-${tx.amount.toFixed(2)}` : tx.amount.toFixed(2),
  ])

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join(
    '\n'
  )
  return csvContent
}

/**
 * Trigger a CSV file download in the browser.
 * @param {import('../store/useFinanceStore').Transaction[]} transactions
 */
export const downloadTransactionsCsv = (transactions) => {
  if (transactions.length === 0) return

  const csv = transactionsToCsv(transactions)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `fintrack_transactions_${getTodayIso()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
