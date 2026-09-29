import { useState } from 'react'
import type { Trip } from '../types'
import {
  formatDateRange,
  daysUntil,
  tripStatus,
  tripLength,
  formatMoney,
} from '../lib/utils'
import { lookupTime } from './TravelTimeBanner'

interface Props {
  trip: Trip
  onClick: () => void
  onDelete: () => void
}

export function TripCard({ trip, onClick, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false)
  const status = tripStatus(trip)
  const days = daysUntil(trip.startDate)
  const packed = trip.packing.filter((p) => p.packed).length
  const totalPacking = trip.packing.length
  const spent = trip.expenses.reduce((s, e) => s + e.amount, 0)
  const travelTime = lookupTime(trip.destination)

  return (
    <div className="card card-hover" onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ marginBottom: 4 }}>
            {trip.title}
          </h3>
          <div style={{ fontSize: '0.875rem', color: 'var(--c-text-muted)', marginBottom: 8 }}>
            {trip.destination}
          </div>
        </div>
        <span
          className={`badge ${
            status === 'active'
              ? 'badge-success'
              : status === 'upcoming'
                ? 'badge-primary'
                : ''
          }`}
        >
          {status === 'active'
            ? 'Active'
            : status === 'upcoming'
              ? `${days}d away`
              : 'Past'}
        </span>
      </div>

      {travelTime && (
        <div className="travel-time-inline">
          Est. flight time: <strong>{travelTime.flight}</strong>
        </div>
      )}

      <div style={{ fontSize: '0.875rem', color: 'var(--c-text-muted)', marginBottom: 12 }}>
        {formatDateRange(trip.startDate, trip.endDate)} &middot; {tripLength(trip)} days
      </div>

      <div style={{ display: 'flex', gap: 16, fontSize: '0.8125rem' }}>
        <span>
          {trip.activities.length} activities
        </span>
        {totalPacking > 0 && (
          <span>
            {packed}/{totalPacking} packed
          </span>
        )}
        {spent > 0 && (
          <span>
            {formatMoney(spent, trip.currency)} spent
          </span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12, gap: 8 }}>
        {confirming ? (
          <>
            <span style={{ fontSize: '0.8125rem', color: 'var(--c-text-muted)', alignSelf: 'center' }}>
              Are you sure?
            </span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={(e) => {
                e.stopPropagation()
                setConfirming(false)
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              Yes, Delete
            </button>
          </>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation()
              setConfirming(true)
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
