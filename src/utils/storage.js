import { STORAGE_KEYS } from '../constants'

/**
 * Safely read a JSON value from LocalStorage.
 * Returns `fallback` if the key is missing or the value is malformed.
 */
export const readFromStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    console.warn(`[FinTrack] Failed to read "${key}" from LocalStorage. Resetting.`)
    return fallback
  }
}

/**
 * Safely write a JSON value to LocalStorage.
 */
export const writeToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`[FinTrack] Failed to write "${key}" to LocalStorage:`, err)
  }
}

/**
 * Load persisted transactions. Returns an empty array if none exist.
 */
export const loadTransactions = () =>
  readFromStorage(STORAGE_KEYS.TRANSACTIONS, [])

/**
 * Persist the full transactions array.
 */
export const saveTransactions = (transactions) =>
  writeToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)

/**
 * Load persisted budget config. Returns an empty object if none exists.
 */
export const loadBudgets = () =>
  readFromStorage(STORAGE_KEYS.BUDGETS, {})

/**
 * Persist the budget config object.
 */
export const saveBudgets = (budgets) =>
  writeToStorage(STORAGE_KEYS.BUDGETS, budgets)
