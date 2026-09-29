import { useState } from 'react'
import { useTrips } from '../context/TripContext'
import { TripCard } from '../components/TripCard'
import { CreateTripModal } from '../components/CreateTripModal'
import type { TripStatus } from '../lib/utils'
import { tripStatus, clsx } from '../lib/utils'

const STATUSES: { key: TripStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'active', label: 'Active' },
  { key: 'past', label: 'Past' },
]

export function Home({ onOpenTrip }: { onOpenTrip: (id: string) => void }) {
  const { trips, createTrip, deleteTrip } = useTrips()
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState<TripStatus | 'all'>('all')

  const filtered =
    filter === 'all' ? trips : trips.filter((t) => tripStatus(t) === filter)

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>My Trips</h2>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          + New Trip
        </button>
      </div>

      {trips.length > 0 && (
        <div className="filter-bar">
          {STATUSES.map((s) => (
            <button
              key={s.key}
              className={clsx('chip', filter === s.key && 'active')}
              onClick={() => setFilter(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="trip-grid">
          {filtered.map((t) => (
            <TripCard
              key={t.id}
              trip={t}
              onClick={() => onOpenTrip(t.id)}
              onDelete={() => deleteTrip(t.id)}
            />
          ))}
        </div>
      ) : trips.length > 0 ? (
        <div className="empty">
          <p>No {filter} trips</p>
        </div>
      ) : (
        <div className="empty">
          <p>No trips yet. Create your first trip to start planning!</p>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            + Create Trip
          </button>
        </div>
      )}

      {showCreate && (
        <CreateTripModal
          onClose={() => setShowCreate(false)}
          onCreate={(t) => {
            createTrip(t)
            setShowCreate(false)
          }}
        />
      )}
    </div>
  )
}
