import { useState, useRef, useEffect, type FormEvent } from 'react'
import { todayISO, CURRENCIES } from '../lib/utils'
import { ALL_DESTINATIONS } from '../lib/destinations'

interface PlanResult {
  destination: string
  duration: number
  startDate: string
  preferences: string
  currency: string
  budget: number
}

interface Props {
  onGenerate: (result: PlanResult) => void
  onDestinationChange?: (dest: string) => void
}

export function Plan({ onGenerate, onDestinationChange }: Props) {
  const today = todayISO()
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState(3)
  const [startDate, setStartDate] = useState('')
  const [preferences, setPreferences] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [budget, setBudget] = useState(1500)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const suggestRef = useRef<HTMLDivElement>(null)

  const suggestions = destination.trim().length >= 1
    ? ALL_DESTINATIONS.filter((d) => {
        const q = destination.toLowerCase()
        return d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
      }).slice(0, 8)
    : []

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const pickSuggestion = (name: string, country: string) => {
    const val = `${name}, ${country}`
    setDestination(val)
    onDestinationChange?.(val)
    setShowSuggestions(false)
    setActiveIndex(-1)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!destination.trim()) return
    onGenerate({
      destination: destination.trim(),
      duration,
      startDate: startDate || today,
      preferences: preferences.trim(),
      currency,
      budget,
    })
  }

  return (
    <div className="fade-in">
      <div className="hero-section">
        <h1>Plan Your Perfect Trip</h1>
        <p>
          Enter your destination and preferences, and get a day-by-day itinerary tailored just for you in seconds.
        </p>
      </div>

      <div className="plan-card">
        <h2>Plan Your Trip</h2>
        <div className="subtitle">Enter a city, region, or country to get started.</div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="form-group" ref={suggestRef} style={{ position: 'relative' }}>
            <label>Destination</label>
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                onDestinationChange?.(e.target.value)
                setShowSuggestions(true)
                setActiveIndex(-1)
              }}
              onFocus={() => destination.trim().length >= 1 && setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (!showSuggestions || suggestions.length === 0) return
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1))
                } else if (e.key === 'Enter' && activeIndex >= 0) {
                  e.preventDefault()
                  const s = suggestions[activeIndex]
                  pickSuggestion(s.name, s.country)
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false)
                }
              }}
              placeholder="e.g. Kyoto, Japan"
              required
              autoFocus
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {suggestions.map((s, i) => (
                  <div
                    key={s.id}
                    className={`autocomplete-item ${i === activeIndex ? 'autocomplete-active' : ''}`}
                    onMouseDown={() => pickSuggestion(s.name, s.country)}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <img src={s.photoUrl} alt="" className="autocomplete-img" />
                    <div className="autocomplete-info">
                      <div className="autocomplete-name">{s.name}</div>
                      <div className="autocomplete-country">{s.country} &middot; {s.region}</div>
                    </div>
                    <div className="autocomplete-budget">~${s.dailyBudgetUsd}/day</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Duration (Days)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Start Date (Optional)</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Pick a date"
              />
            </div>
          </div>

          <div className="form-row form-row-2">
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
          </div>

          <div className="form-group">
            <label>Preferences (Optional)</label>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="What do you love? e.g. Specialty coffee, brutalist architecture, modern art, hidden parks..."
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-primary-lg">
            Generate Itinerary
          </button>
        </form>
      </div>
    </div>
  )
}
