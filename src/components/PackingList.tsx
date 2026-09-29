import { useState, type FormEvent } from 'react'
import type { PackingCategory, PackingItem, Trip } from '../types'
import { useTrips } from '../context/TripContext'
import { PACKING_META, clsx } from '../lib/utils'

const QUICK_ADD: { label: string; category: PackingCategory }[] = [
  { label: 'Passport', category: 'documents' },
  { label: 'Charger', category: 'tech' },
  { label: 'Toothbrush', category: 'toiletries' },
  { label: 'Underwear', category: 'clothing' },
  { label: 'Sunscreen', category: 'toiletries' },
  { label: 'Wallet', category: 'essentials' },
  { label: 'Headphones', category: 'tech' },
  { label: 'Medications', category: 'essentials' },
]

export function PackingList({ trip }: { trip: Trip }) {
  const { addPackingItem, updatePackingItem, deletePackingItem } = useTrips()
  const [showForm, setShowForm] = useState(false)

  const grouped = (
    Object.keys(PACKING_META) as PackingCategory[]
  )
    .map((cat) => ({
      cat,
      items: trip.packing.filter((p) => p.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  const packed = trip.packing.filter((p) => p.packed).length
  const total = trip.packing.length
  const pct = total > 0 ? Math.round((packed / total) * 100) : 0

  const existingLabels = new Set(trip.packing.map((p) => p.label.toLowerCase()))

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>
          Packing List
          <span className="count">
            {packed}/{total} packed ({pct}%)
          </span>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {total > 0 && (
        <div className="progress" style={{ marginBottom: 20, maxWidth: 400 }}>
          <div
            className="progress-fill"
            style={{ width: `${pct}%`, background: pct === 100 ? 'var(--c-success)' : 'var(--c-primary)' }}
          />
        </div>
      )}

      {showForm && (
        <PackingForm
          onAdd={(p) => {
            addPackingItem(p)
          }}
        />
      )}

      {total < 6 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--c-text-muted)', marginBottom: 6 }}>
            Quick add:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {QUICK_ADD.filter((q) => !existingLabels.has(q.label.toLowerCase())).map((q) => (
              <button
                key={q.label}
                className="chip"
                onClick={() =>
                  addPackingItem({ label: q.label, category: q.category, qty: 1, packed: false })
                }
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {grouped.length === 0 ? (
        <div className="empty">
          <p>Start adding items to your packing list</p>
        </div>
      ) : (
        grouped.map(({ cat, items }) => (
          <div className="packing-group" key={cat}>
            <h4>
              {PACKING_META[cat].label} ({items.filter((i) => i.packed).length}/
              {items.length})
            </h4>
            {items.map((item) => (
              <div className={clsx('packing-item', item.packed && 'packed')} key={item.id}>
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => updatePackingItem(item.id, { packed: !item.packed })}
                />
                <span>{item.label}</span>
                {item.qty > 1 && <span className="qty">x{item.qty}</span>}
                <div className="actions">
                  <button
                    className="btn btn-ghost btn-icon btn-sm btn-danger-text"
                    onClick={() => deletePackingItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}

function PackingForm({ onAdd }: { onAdd: (p: Omit<PackingItem, 'id'>) => void }) {
  const [label, setLabel] = useState('')
  const [category, setCategory] = useState<PackingCategory>('essentials')
  const [qty, setQty] = useState(1)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!label.trim()) return
    onAdd({ label: label.trim(), category, qty, packed: false })
    setLabel('')
    setQty(1)
  }

  return (
    <form
      onSubmit={submit}
      className="card"
      style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div className="form-row form-row-3">
        <div className="form-group" style={{ gridColumn: 'span 1' }}>
          <label>Item *</label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Rain jacket"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as PackingCategory)}
          >
            {(Object.entries(PACKING_META) as [PackingCategory, { label: string }][]).map(
              ([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Qty</label>
          <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary btn-sm">
          Add Item
        </button>
      </div>
    </form>
  )
}
