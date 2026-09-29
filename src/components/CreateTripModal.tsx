import { useState, type FormEvent } from 'react'
import type { Trip } from '../types'
import { addDays, todayISO, CURRENCIES } from '../lib/utils'

type TripDraft = Omit<Trip, 'id' | 'createdAt' | 'activities' | 'packing' | 'expenses'>

interface Props {
  onClose: () => void
  onCreate: (t: TripDraft) => void
  initial?: Partial<TripDraft>
}

export function CreateTripModal({ onClose, onCreate, initial }: Props) {
  const today = todayISO()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [destination, setDestination] = useState(initial?.destination ?? '')
  const [startDate, setStartDate] = useState(initial?.startDate ?? today)
  const [endDate, setEndDate] = useState(initial?.endDate ?? addDays(today, 5))
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [currency, setCurrency] = useState(initial?.currency ?? 'USD')
  const [budget, setBudget] = useState(initial?.budget ?? 2000)
  const [travelers, setTravelers] = useState(initial?.travelers ?? 1)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !destination.trim()) return
    onCreate({
      title: title.trim(),
      destination: destination.trim(),
      startDate,
      endDate,
      emoji: '',
      notes: notes.trim(),
      currency,
      budget,
      travelers,
    })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Trip</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label>Trip Name *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summer in Italy"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Destination *</label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Rome, Italy"
              required
            />
          </div>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="form-row form-row-3">
            <div className="form-group">
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Budget</label>
              <input
                type="number"
                min={0}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Travelers</label>
              <input
                type="number"
                min={1}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes about this trip..."
              rows={3}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
