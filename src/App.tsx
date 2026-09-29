import { useCallback, useState } from 'react'
import { TripProvider, useTrips } from './context/TripContext'
import { Plan } from './pages/Plan'
import { Home } from './pages/Home'
import { TripDetail } from './pages/TripDetail'
import { Recommended } from './pages/Recommended'
import { Explore } from './pages/Explore'
import { Favorites } from './pages/Favorites'
import { CreateTripModal } from './components/CreateTripModal'
import { TravelTimeBanner } from './components/TravelTimeBanner'
import { ChatBot } from './components/ChatBot'
import { addDays, clsx } from './lib/utils'
import type { Destination } from './types'
import logoSvg from './assets/logo.svg'

type Page = 'plan' | 'mytrips' | 'recommended' | 'explore' | 'favorites' | 'detail'

const NAV_ITEMS: { key: Page; label: string }[] = [
  { key: 'plan', label: 'Plan' },
  { key: 'mytrips', label: 'My Trips' },
  { key: 'recommended', label: 'Recommended' },
  { key: 'explore', label: 'Explore' },
  { key: 'favorites', label: 'Favorites' },
]

function AppInner() {
  const { setActiveId, createTrip, activeTrip } = useTrips()
  const [page, setPage] = useState<Page>('plan')
  const [prevPage, setPrevPage] = useState<Page>('plan')
  const [destForTrip, setDestForTrip] = useState<Destination | undefined>()
  const [planDestination, setPlanDestination] = useState('')
  const [planData, setPlanData] = useState<{
    destination: string
    duration: number
    startDate: string
    preferences: string
    currency: string
    budget: number
  } | undefined>()

  // favorites are stored in state (persisted to localStorage)
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('tripsync_favorites')
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch {
      return new Set()
    }
  })

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem('tripsync_favorites', JSON.stringify([...next]))
      return next
    })
  }, [])

  const navigateTo = (p: Page) => {
    setPrevPage(page)
    setPage(p)
  }

  const openTrip = (id: string) => {
    setActiveId(id)
    setPrevPage(page)
    setPage('detail')
  }

  const goBack = () => {
    setActiveId(undefined)
    setPage(prevPage === 'detail' ? 'mytrips' : prevPage)
  }

  const handleStartTrip = (dest: Destination) => {
    setDestForTrip(dest)
  }

  const handleGenerate = (data: typeof planData & {}) => {
    setPlanData(data)
  }

  return (
    <div className="app-shell">
      {/* header */}
      <header className="app-header">
        <div className="logo" onClick={() => navigateTo('plan')}>
          <img src={logoSvg} alt="TripSync" className="logo-img" />
          <span className="logo-text">Tripsync</span>
        </div>
        <nav>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={clsx('nav-link', page === item.key && 'active')}
              onClick={() => navigateTo(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* travel time banner */}
      {page === 'plan' && <TravelTimeBanner destination={planDestination} />}
      {page === 'detail' && activeTrip && <TravelTimeBanner destination={activeTrip.destination} />}

      {/* pages */}
      {page === 'plan' && (
        <Plan
          onGenerate={handleGenerate}
          onDestinationChange={setPlanDestination}
        />
      )}
      {page === 'mytrips' && <Home onOpenTrip={openTrip} />}
      {page === 'detail' && <TripDetail onBack={goBack} />}
      {page === 'recommended' && (
        <Recommended
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onStartTrip={handleStartTrip}
        />
      )}
      {page === 'explore' && (
        <Explore
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onStartTrip={handleStartTrip}
        />
      )}
      {page === 'favorites' && (
        <Favorites
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onStartTrip={handleStartTrip}
        />
      )}

      {/* modal from Explore/Recommended → "Plan a trip here" */}
      {destForTrip && (
        <CreateTripModal
          onClose={() => setDestForTrip(undefined)}
          onCreate={(t) => {
            const trip = createTrip(t)
            setDestForTrip(undefined)
            openTrip(trip.id)
          }}
          initial={{
            title: `Trip to ${destForTrip.name}`,
            destination: `${destForTrip.name}, ${destForTrip.country}`,
            budget: destForTrip.dailyBudgetUsd * 7,
          }}
        />
      )}

      {/* AI chatbot */}
      <ChatBot />

      {/* modal from Plan → "Generate Itinerary" */}
      {planData && (
        <CreateTripModal
          onClose={() => setPlanData(undefined)}
          onCreate={(t) => {
            const trip = createTrip(t)
            setPlanData(undefined)
            openTrip(trip.id)
          }}
          initial={{
            title: `Trip to ${planData.destination}`,
            destination: planData.destination,
            startDate: planData.startDate,
            endDate: addDays(planData.startDate, planData.duration - 1),
            currency: planData.currency,
            budget: planData.budget,
            notes: planData.preferences,
          }}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <TripProvider>
      <AppInner />
    </TripProvider>
  )
}
