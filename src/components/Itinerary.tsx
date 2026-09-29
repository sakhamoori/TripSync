import { useState, type FormEvent } from 'react'
import type { Activity, ActivityCategory, Trip } from '../types'
import { useTrips } from '../context/TripContext'
import {
  ACTIVITY_META,
  clsx,
  dateRange,
  formatDate,
  formatTime,
  todayISO,
} from '../lib/utils'

export function Itinerary({ trip }: { trip: Trip }) {
  const { addActivity, updateActivity, deleteActivity } = useTrips()
  const [showForm, setShowForm] = useState(false)
  const days = dateRange(trip.startDate, trip.endDate)

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>
          Itinerary
          <span className="count">({trip.activities.length})</span>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showForm && (
        <ActivityForm
          defaultDate={trip.startDate}
          days={days}
          onAdd={(a) => {
            addActivity(a)
            setShowForm(false)
          }}
        />
      )}

      {days.length === 0 ? (
        <div className="empty">
          <p>Set trip dates to see a day-by-day itinerary</p>
        </div>
      ) : (
        days.map((date, i) => {
          const acts = trip.activities
            .filter((a) => a.date === date)
            .sort((a, b) => (a.time || 'zz').localeCompare(b.time || 'zz'))
          return (
            <div className="day-block" key={date}>
              <div className="day-header">
                <span className="day-num">{i + 1}</span>
                <span>
                  {formatDate(date, { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                {date === todayISO() && <span className="badge badge-success">Today</span>}
              </div>
              {acts.length === 0 ? (
                <div style={{ padding: '8px 14px', fontSize: '0.875rem', color: 'var(--c-text-muted)' }}>
                  Nothing planned yet
                </div>
              ) : (
                acts.map((a) => (
                  <div className={clsx('activity-row', a.done && 'done')} key={a.id}>
                    <span className="time">{a.time ? formatTime(a.time) : '--'}</span>
                    <div className="body">
                      <div className="title">
                        [{ACTIVITY_META[a.category].label}] {a.title}
                      </div>
                      {a.location && <div className="meta">{a.location}</div>}
                      {a.notes && <div className="meta">{a.notes}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        className="btn btn-ghost btn-icon btn-sm"
                        title={a.done ? 'Mark undone' : 'Mark done'}
                        onClick={() => updateActivity(a.id, { done: !a.done })}
                      >
                        {a.done ? 'Undo' : 'Done'}
                      </button>
                      <button
                        className="btn btn-ghost btn-icon btn-sm btn-danger-text"
                        title="Delete"
                        onClick={() => deleteActivity(a.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

function ActivityForm({
  defaultDate,
  days,
  onAdd,
}: {
  defaultDate: string
  days: string[]
  onAdd: (a: Omit<Activity, 'id'>) => void
}) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(defaultDate)
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState<ActivityCategory>('sightseeing')
  const [notes, setNotes] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      date,
      time,
      location: location.trim(),
      category,
      notes: notes.trim(),
      done: false,
    })
    setTitle('')
    setTime('')
    setLocation('')
    setNotes('')
  }

  return (
    <form
      onSubmit={submit}
      className="card"
      style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div className="form-group">
        <label>Activity *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Visit the Colosseum" autoFocus />
      </div>

      <div className="form-row form-row-3">
        <div className="form-group">
          <label>Day</label>
          <select value={date} onChange={(e) => setDate(e.target.value)}>
            {days.map((d, i) => (
              <option key={d} value={d}>
                Day {i + 1} -- {formatDate(d)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ActivityCategory)}
          >
            {(Object.entries(ACTIVITY_META) as [ActivityCategory, { label: string }][]).map(
              ([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Piazza del Colosseo" />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes..." />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary btn-sm">
          Add Activity
        </button>
      </div>
    </form>
  )
}
