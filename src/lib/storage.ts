import type { Trip } from '../types'

const KEY = 'wanderlog_trips'

export function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTrips(trips: Trip[]): void {
  localStorage.setItem(KEY, JSON.stringify(trips))
}
