import { useState } from 'react'
import { ALL_DESTINATIONS } from '../lib/destinations'
import { clsx } from '../lib/utils'
import type { Destination } from '../types'

const REGIONS = ['All', ...Array.from(new Set(ALL_DESTINATIONS.map((d) => d.region)))]

interface Props {
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
  onStartTrip: (dest: Destination) => void
}

export function Explore({ favorites, onToggleFavorite, onStartTrip }: Props) {
  const [region, setRegion] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = ALL_DESTINATIONS.filter((d) => {
    if (region !== 'All' && d.region !== region) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tags.some((t) => t.includes(q))
      )
    }
    return true
  })

  return (
    <div className="page fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
        Explore Destinations
      </h2>
      <p style={{ color: 'var(--c-text-muted)', marginBottom: 20 }}>
        Browse all destinations and find your next adventure.
      </p>

      <div style={{ marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations..."
          style={{ width: '100%', maxWidth: 400 }}
        />
      </div>

      <div className="filter-bar">
        {REGIONS.map((r) => (
          <button
            key={r}
            className={clsx('chip', region === r && 'active')}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <p>No destinations match your search</p>
        </div>
      ) : (
        <div className="dest-grid">
          {filtered.map((d) => (
            <div className="card dest-card" key={d.id}>
              <h3>
                {d.name}
                <button
                  className="fav-btn"
                  onClick={() => onToggleFavorite(d.id)}
                  style={{ marginLeft: 'auto' }}
                >
                  {favorites.has(d.id) ? 'Saved' : 'Save'}
                </button>
              </h3>
              <div className="meta-line">{d.country} &middot; {d.region}</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--c-text-muted)' }}>{d.blurb}</p>
              <div className="meta-line">Best time: {d.bestMonths}</div>
              <div className="meta-line">~${d.dailyBudgetUsd}/day per person</div>
              <div className="tags">
                {d.tags.map((t) => (
                  <span className="badge" key={t}>{t}</span>
                ))}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--c-text-muted)' }}>
                Highlights: {d.highlights.join(' / ')}
              </div>
              <button
                className="btn btn-primary btn-sm"
                style={{ alignSelf: 'flex-start', marginTop: 4 }}
                onClick={() => onStartTrip(d)}
              >
                + Plan a trip here
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
