import { useState, useCallback } from 'react'
import { useFinance } from '../../App'
import { getTodayIso } from '../../utils/formatters'
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  TRANSACTION_TYPES,
} from '../../constants'

const INITIAL_FORM = {
  amount: '',
  type: TRANSACTION_TYPES.EXPENSE,
  category: '',
  date: getTodayIso(),
  description: '',
}

const INITIAL_ERRORS = {
  amount: '',
  category: '',
  date: '',
  description: '',
}

const validate = (form) => {
  const errors = { ...INITIAL_ERRORS }
  let isValid = true

  if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
    errors.amount = 'Enter a positive amount'
    isValid = false
  }
  if (!form.category) {
    errors.category = 'Select a category'
    isValid = false
  }
  if (!form.date) {
    errors.date = 'Select a date'
    isValid = false
  }
  if (form.description.length > 100) {
    errors.description = 'Max 100 characters'
    isValid = false
  }

  return { errors, isValid }
}

export default function TransactionForm() {
  const { addTransaction } = useFinance()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [submitted, setSubmitted] = useState(false)

  const categories =
    form.type === TRANSACTION_TYPES.EXPENSE
      ? EXPENSE_CATEGORIES
      : INCOME_CATEGORIES

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      // Reset category when type changes
      if (name === 'type') updated.category = ''
      return updated
    })
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const { errors: validationErrors, isValid } = validate(form)
    setErrors(validationErrors)
    if (!isValid) return

    addTransaction(form)
    setForm({ ...INITIAL_FORM, date: getTodayIso() })
    setErrors(INITIAL_ERRORS)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }, [form, addTransaction])

  return (
    <div className="card p-5 h-fit">
      <h2 className="text-base font-bold text-brand-dark mb-4 flex items-center gap-2">
        <span className="w-6 h-6 bg-brand-purple rounded-md flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </span>
        Add Transaction
      </h2>

      {/* Type Toggle */}
      <div className="flex rounded-lg border border-brand-border overflow-hidden mb-4">
        {[TRANSACTION_TYPES.EXPENSE, TRANSACTION_TYPES.INCOME].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleChange({ target: { name: 'type', value: type } })}
            className={`flex-1 py-2 text-sm font-semibold transition-all duration-150 capitalize ${
              form.type === type
                ? type === TRANSACTION_TYPES.EXPENSE
                  ? 'bg-brand-red text-white'
                  : 'bg-green-500 text-white'
                : 'bg-white text-brand-muted hover:bg-brand-bg'
            }`}
          >
            {type === TRANSACTION_TYPES.EXPENSE ? '📉 Expense' : '📈 Income'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="form-label">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted font-medium text-sm">$</span>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              className={`form-input pl-7 ${errors.amount ? 'border-brand-red focus:ring-brand-red' : ''}`}
            />
          </div>
          {errors.amount && <p className="form-error">{errors.amount}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`form-input ${errors.category ? 'border-brand-red focus:ring-brand-red' : ''}`}
          >
            <option value="">Select a category…</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="form-label">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={`form-input ${errors.date ? 'border-brand-red focus:ring-brand-red' : ''}`}
          />
          {errors.date && <p className="form-error">{errors.date}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="form-label">
            Description
            <span className="text-brand-muted font-normal ml-1">(optional)</span>
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Grocery run at Trader Joe's"
            value={form.description}
            onChange={handleChange}
            maxLength={100}
            className={`form-input ${errors.description ? 'border-brand-red focus:ring-brand-red' : ''}`}
          />
          <div className="flex justify-between mt-1">
            {errors.description
              ? <p className="form-error">{errors.description}</p>
              : <span />
            }
            <span className="text-xs text-brand-muted">{form.description.length}/100</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`btn-primary w-full mt-1 transition-all duration-200 ${
            submitted ? 'bg-green-500 shadow-none' : ''
          }`}
        >
          {submitted ? '✓ Transaction Added!' : 'Add Transaction'}
        </button>
      </form>
    </div>
  )
}
