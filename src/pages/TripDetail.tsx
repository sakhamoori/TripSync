import { useState } from 'react'
import { useTrips } from '../context/TripContext'
import {
  clsx,
  daysUntil,
  formatDateRange,
  formatMoney,
  tripLength,
  tripStatus,
} from '../lib/utils'
import { Itinerary } from '../components/Itinerary'
import { PackingList } from '../components/PackingList'
import { Expenses } from '../components/Expenses'
import { DestinationMap } from '../components/DestinationMap'

type Tab = 'itinerary' | 'packing' | 'budget'

const TABS: { key: Tab; label: string }[] = [
  { key: 'itinerary', label: 'Itinerary' },
  { key: 'packing', label: 'Packing' },
  { key: 'budget', label: 'Budget' },
]

export function TripDetail({ onBack }: { onBack: () => void }) {
  const { activeTrip: trip } = useTrips()
  const [tab, setTab] = useState<Tab>('itinerary')

  if (!trip) return null

  const status = tripStatus(trip)
  const days = daysUntil(trip.startDate)
  const packed = trip.packing.filter((p) => p.packed).length
  const totalPacking = trip.packing.length
  const spent = trip.expenses.reduce((s, e) => s + e.amount, 0)

  return (
    <div className="page fade-in">
      <button className="back-btn" onClick={onBack}>
        All Trips
      </button>

      <div className="trip-hero">
        <h2>
          {trip.title}
          <span
            className={`badge ${
              status === 'active'
                ? 'badge-success'
                : status === 'upcoming'
                  ? 'badge-primary'
                  : ''
            }`}
            style={{ marginLeft: 8, fontSize: '0.8rem' }}
          >
            {status === 'active'
              ? 'Active'
              : status === 'upcoming'
                ? `${days} days away`
                : 'Completed'}
          </span>
        </h2>
        <div className="subtitle">
          {trip.destination} &middot; {formatDateRange(trip.startDate, trip.endDate)} &middot;{' '}
          {tripLength(trip)} days
          {trip.travelers > 1 ? ` · ${trip.travelers} travelers` : ''}
        </div>

        <div className="stats">
          <div className="stat">
            <span className="val">{trip.activities.length}</span>
            <span className="lbl">Activities</span>
          </div>
          {totalPacking > 0 && (
            <div className="stat">
              <span className="val">
                {packed}/{totalPacking}
              </span>
              <span className="lbl">Packed</span>
            </div>
          )}
          <div className="stat">
            <span className="val">{formatMoney(spent, trip.currency)}</span>
            <span className="lbl">
              Spent{trip.budget > 0 ? ` / ${formatMoney(trip.budget, trip.currency)}` : ''}
            </span>
          </div>
        </div>

        {trip.budget > 0 && (
          <div style={{ marginTop: 12, maxWidth: 400 }}>
            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min((spent / trip.budget) * 100, 100)}%`,
                  background:
                    spent > trip.budget
                      ? 'var(--c-danger)'
                      : spent > trip.budget * 0.8
                        ? 'var(--c-warning)'
                        : 'var(--c-primary)',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--c-text-muted)',
                marginTop: 4,
              }}
            >
              <span>{Math.round((spent / trip.budget) * 100)}% of budget</span>
              <span>{formatMoney(Math.max(trip.budget - spent, 0), trip.currency)} left</span>
            </div>
          </div>
        )}
      </div>

      <DestinationMap destination={trip.destination} />

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={clsx('tab', tab === t.key && 'active')}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'itinerary' && <Itinerary trip={trip} />}
      {tab === 'packing' && <PackingList trip={trip} />}
      {tab === 'budget' && <Expenses trip={trip} />}
    </div>
  )
}
