import { DESTINATIONS } from '../lib/destinations'
import type { Destination } from '../types'

interface Props {
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
  onStartTrip: (dest: Destination) => void
}

export function Recommended({ favorites, onToggleFavorite, onStartTrip }: Props) {
  return (
    <div className="page fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
        Recommended For You
      </h2>
      <p style={{ color: 'var(--c-text-muted)', marginBottom: 24 }}>
        Hand-picked destinations based on popular travel trends.
      </p>

      <div className="rec-grid">
        {DESTINATIONS.map((d) => (
          <div className="card card-hover rec-card" key={d.id} onClick={() => onStartTrip(d)}>
            <div className="rec-img">
              <img src={d.photoUrl} alt={d.name} loading="lazy" />
            </div>
            <div className="rec-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3>{d.name}</h3>
                  <div className="country">{d.country}</div>
                </div>
                <button
                  className="fav-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(d.id)
                  }}
                  title={favorites.has(d.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorites.has(d.id) ? 'Saved' : 'Save'}
                </button>
              </div>
              <p>{d.blurb}</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {d.tags.map((t) => (
                  <span className="badge" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
