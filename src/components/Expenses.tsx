import { useState, type FormEvent } from 'react'
import type { Expense, ExpenseCategory, Trip } from '../types'
import { useTrips } from '../context/TripContext'
import { EXPENSE_META, formatDate, formatMoney, todayISO } from '../lib/utils'

export function Expenses({ trip }: { trip: Trip }) {
  const { addExpense, deleteExpense } = useTrips()
  const [showForm, setShowForm] = useState(false)

  const spent = trip.expenses.reduce((s, e) => s + e.amount, 0)
  const byCategory = (Object.keys(EXPENSE_META) as ExpenseCategory[]).map((cat) => {
    const total = trip.expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0)
    return { cat, total }
  }).filter((c) => c.total > 0)

  const sorted = [...trip.expenses].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>
          Budget & Expenses
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : '+ Add Expense'}
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', textTransform: 'uppercase' }}>
            Spent
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatMoney(spent, trip.currency)}</div>
        </div>
        {trip.budget > 0 && (
          <>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', textTransform: 'uppercase' }}>
                Budget
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                {formatMoney(trip.budget, trip.currency)}
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', textTransform: 'uppercase' }}>
                Remaining
              </div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: spent > trip.budget ? 'var(--c-danger)' : 'var(--c-success)',
                }}
              >
                {formatMoney(Math.max(trip.budget - spent, 0), trip.currency)}
              </div>
            </div>
          </>
        )}
      </div>

      {byCategory.length > 0 && spent > 0 && (
        <>
          <div className="expense-bar">
            {byCategory.map(({ cat, total }) => (
              <div
                key={cat}
                style={{
                  width: `${(total / spent) * 100}%`,
                  background: EXPENSE_META[cat].color,
                }}
              />
            ))}
          </div>
          <div className="expense-legend">
            {byCategory.map(({ cat, total }) => (
              <span key={cat}>
                <span className="dot" style={{ background: EXPENSE_META[cat].color }} />
                {EXPENSE_META[cat].label} ({formatMoney(total, trip.currency)})
              </span>
            ))}
          </div>
        </>
      )}

      {showForm && (
        <ExpenseForm
          currency={trip.currency}
          defaultDate={trip.startDate}
          onAdd={(e) => {
            addExpense(e)
            setShowForm(false)
          }}
        />
      )}

      {sorted.length === 0 ? (
        <div className="empty" style={{ marginTop: 20 }}>
          <p>No expenses logged yet</p>
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          {sorted.map((e) => (
            <div className="expense-row" key={e.id}>
              <span className="icon">{EXPENSE_META[e.category].label.charAt(0)}</span>
              <div className="info">
                <div className="label">{e.label}</div>
                <div className="date">{formatDate(e.date)}</div>
              </div>
              <span className="amount">{formatMoney(e.amount, trip.currency)}</span>
              <button
                className="btn btn-ghost btn-icon btn-sm btn-danger-text"
                onClick={() => deleteExpense(e.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ExpenseForm({
  currency,
  defaultDate,
  onAdd,
}: {
  currency: string
  defaultDate: string
  onAdd: (e: Omit<Expense, 'id'>) => void
}) {
  const [label, setLabel] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<ExpenseCategory>('food')
  const [date, setDate] = useState(defaultDate || todayISO())

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!label.trim() || !amount) return
    onAdd({
      label: label.trim(),
      amount: Number(amount),
      category,
      date,
    })
    setLabel('')
    setAmount('')
  }

  return (
    <form
      onSubmit={submit}
      className="card"
      style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div className="form-row form-row-2">
        <div className="form-group">
          <label>Description *</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Dinner at Trattoria" autoFocus />
        </div>
        <div className="form-group">
          <label>Amount ({currency}) *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="45.00"
          />
        </div>
      </div>
      <div className="form-row form-row-2">
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          >
            {(Object.entries(EXPENSE_META) as [ExpenseCategory, { label: string }][]).map(
              ([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary btn-sm">
          Add Expense
        </button>
      </div>
    </form>
  )
}
