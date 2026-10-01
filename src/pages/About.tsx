export function About() {
  return (
    <div className="page fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
        About TripSync
      </h2>
      <p style={{ color: 'var(--c-text-muted)', marginBottom: 24 }}>
        Your travel planning companion — one calm place to dream, plan, and pack.
      </p>

      <div className="card" style={{ marginBottom: 16, padding: 24 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>
          What is TripSync?
        </h3>
        <p style={{ color: 'var(--c-text-muted)', lineHeight: 1.6, margin: 0 }}>
          TripSync helps you turn trip ideas into real plans. From the first spark of
          a destination to day-by-day itineraries, packing lists, and budgets — keep
          everything in sync without juggling a dozen tabs and notes.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16, padding: 24 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 12 }}>
          What you can do
        </h3>
        <ul
          style={{
            color: 'var(--c-text-muted)',
            lineHeight: 1.7,
            margin: 0,
            paddingLeft: 20,
          }}
        >
          <li>
            <strong style={{ color: 'var(--c-text)' }}>Plan</strong> — sketch a new
            trip with destination, dates, preferences, and budget.
          </li>
          <li>
            <strong style={{ color: 'var(--c-text)' }}>My Trips</strong> — see upcoming,
            active, and past trips in one list.
          </li>
          <li>
            <strong style={{ color: 'var(--c-text)' }}>Recommended, Explore &amp; Favorites</strong>{' '}
            — browse destinations and save the ones you love.
          </li>
          <li>
            <strong style={{ color: 'var(--c-text)' }}>Itinerary, Packing &amp; Budget</strong>{' '}
            — organize each trip day by day, what to bring, and what you&apos;ll spend.
          </li>
          <li>
            <strong style={{ color: 'var(--c-text)' }}>Chatbot helper</strong> — ask for
            ideas, tips, and quick planning help anytime.
          </li>
        </ul>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <p style={{ color: 'var(--c-text-muted)', lineHeight: 1.6, margin: 0 }}>
          Built for travelers who want one place to plan — warm, simple, and ready
          for the next adventure.
        </p>
      </div>
    </div>
  )
}
