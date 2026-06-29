/**
 * Format a number as a currency string.
 * @param {number} amount
 * @param {string} currency - ISO currency code
 */
export const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

/**
 * Format an ISO date string (YYYY-MM-DD) to a human-readable label.
 * @param {string} isoDate
 */
export const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format an ISO date string to "Month YYYY" label.
 * @param {string} isoDate - YYYY-MM-DD or YYYY-MM
 */
export const formatMonthYear = (isoDate) => {
  const [year, month] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/**
 * Get today's date as a YYYY-MM-DD string.
 */
export const getTodayIso = () => {
  const now = new Date()
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')
}

/**
 * Get the current month as a YYYY-MM string.
 */
export const getCurrentMonthKey = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

/**
 * Extract YYYY-MM from an ISO date string.
 * @param {string} isoDate
 */
export const getMonthKey = (isoDate) => isoDate.slice(0, 7)

/**
 * Generate the last N month keys (YYYY-MM), most recent last.
 * @param {number} n
 */
export const getLastNMonthKeys = (n = 6) => {
  const keys = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    keys.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    )
  }
  return keys
}

/**
 * Truncate a string to maxLength chars with an ellipsis.
 * @param {string} str
 * @param {number} maxLength
 */
export const truncate = (str, maxLength = 40) =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str
