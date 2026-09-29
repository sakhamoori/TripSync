import { DESTINATIONS } from '../lib/destinations'
import type { Destination } from '../types'

interface Props {
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
  onStartTrip: (dest: Destination) => void
}

export function Favorites({ favorites, onToggleFavorite, onStartTrip }: Props) {
  const favDests = DESTINATIONS.filter((d) => favorites.has(d.id))

  return (
    <div className="page fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
        Your Favorites
      </h2>
      <p style={{ color: 'var(--c-text-muted)', marginBottom: 24 }}>
        Destinations you've saved for later.
      </p>

      {favDests.length === 0 ? (
        <div className="empty">
          <p>You haven't saved any destinations yet. Browse Recommended or Explore to find places you love.</p>
        </div>
      ) : (
        <div className="dest-grid">
          {favDests.map((d) => (
            <div className="card dest-card" key={d.id}>
              <h3>
                {d.name}
                <button
                  className="fav-btn"
                  onClick={() => onToggleFavorite(d.id)}
                  style={{ marginLeft: 'auto' }}
                >
                  Saved
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
