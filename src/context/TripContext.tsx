import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  Activity,
  Expense,
  ID,
  PackingItem,
  Trip,
} from '../types'
import { loadTrips, saveTrips } from '../lib/storage'
import { uid } from '../lib/utils'

interface TripCtx {
  trips: Trip[]
  activeTrip: Trip | undefined
  setActiveId: (id: ID | undefined) => void
  createTrip: (t: Omit<Trip, 'id' | 'createdAt' | 'activities' | 'packing' | 'expenses'>) => Trip
  updateTrip: (id: ID, patch: Partial<Trip>) => void
  deleteTrip: (id: ID) => void

  addActivity: (a: Omit<Activity, 'id'>) => void
  updateActivity: (actId: ID, patch: Partial<Activity>) => void
  deleteActivity: (actId: ID) => void

  addPackingItem: (p: Omit<PackingItem, 'id'>) => void
  updatePackingItem: (pid: ID, patch: Partial<PackingItem>) => void
  deletePackingItem: (pid: ID) => void

  addExpense: (e: Omit<Expense, 'id'>) => void
  updateExpense: (eid: ID, patch: Partial<Expense>) => void
  deleteExpense: (eid: ID) => void
}

const Ctx = createContext<TripCtx | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useTrips() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTrips() used outside TripProvider')
  return ctx
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(loadTrips)
  const [activeId, setActiveId] = useState<ID | undefined>()

  useEffect(() => {
    saveTrips(trips)
  }, [trips])

  const update = useCallback(
    (fn: (prev: Trip[]) => Trip[]) => setTrips(fn),
    [],
  )

  /* ---- trip CRUD ---- */
  const createTrip = useCallback(
    (t: Omit<Trip, 'id' | 'createdAt' | 'activities' | 'packing' | 'expenses'>) => {
      const trip: Trip = {
        ...t,
        id: uid(),
        createdAt: new Date().toISOString(),
        activities: [],
        packing: [],
        expenses: [],
      }
      update((p) => [...p, trip])
      setActiveId(trip.id)
      return trip
    },
    [update],
  )
  const updateTrip = useCallback(
    (id: ID, patch: Partial<Trip>) =>
      update((p) => p.map((t) => (t.id === id ? { ...t, ...patch } : t))),
    [update],
  )
  const deleteTrip = useCallback(
    (id: ID) => {
      update((p) => p.filter((t) => t.id !== id))
      setActiveId((prev) => (prev === id ? undefined : prev))
    },
    [update],
  )

  /* ---- activity helpers ---- */
  const mutTrip = useCallback(
    (fn: (t: Trip) => Trip) =>
      update((p) =>
        p.map((t) => (t.id === activeId ? fn(t) : t)),
      ),
    [activeId, update],
  )

  const addActivity = useCallback(
    (a: Omit<Activity, 'id'>) =>
      mutTrip((t) => ({ ...t, activities: [...t.activities, { ...a, id: uid() }] })),
    [mutTrip],
  )
  const updateActivity = useCallback(
    (actId: ID, patch: Partial<Activity>) =>
      mutTrip((t) => ({
        ...t,
        activities: t.activities.map((a) => (a.id === actId ? { ...a, ...patch } : a)),
      })),
    [mutTrip],
  )
  const deleteActivity = useCallback(
    (actId: ID) =>
      mutTrip((t) => ({ ...t, activities: t.activities.filter((a) => a.id !== actId) })),
    [mutTrip],
  )

  /* ---- packing helpers ---- */
  const addPackingItem = useCallback(
    (p: Omit<PackingItem, 'id'>) =>
      mutTrip((t) => ({ ...t, packing: [...t.packing, { ...p, id: uid() }] })),
    [mutTrip],
  )
  const updatePackingItem = useCallback(
    (pid: ID, patch: Partial<PackingItem>) =>
      mutTrip((t) => ({
        ...t,
        packing: t.packing.map((p) => (p.id === pid ? { ...p, ...patch } : p)),
      })),
    [mutTrip],
  )
  const deletePackingItem = useCallback(
    (pid: ID) =>
      mutTrip((t) => ({ ...t, packing: t.packing.filter((p) => p.id !== pid) })),
    [mutTrip],
  )

  /* ---- expense helpers ---- */
  const addExpense = useCallback(
    (e: Omit<Expense, 'id'>) =>
      mutTrip((t) => ({ ...t, expenses: [...t.expenses, { ...e, id: uid() }] })),
    [mutTrip],
  )
  const updateExpense = useCallback(
    (eid: ID, patch: Partial<Expense>) =>
      mutTrip((t) => ({
        ...t,
        expenses: t.expenses.map((e) => (e.id === eid ? { ...e, ...patch } : e)),
      })),
    [mutTrip],
  )
  const deleteExpense = useCallback(
    (eid: ID) =>
      mutTrip((t) => ({ ...t, expenses: t.expenses.filter((e) => e.id !== eid) })),
    [mutTrip],
  )

  const activeTrip = useMemo(() => trips.find((t) => t.id === activeId), [trips, activeId])

  const value = useMemo<TripCtx>(
    () => ({
      trips,
      activeTrip,
      setActiveId,
      createTrip,
      updateTrip,
      deleteTrip,
      addActivity,
      updateActivity,
      deleteActivity,
      addPackingItem,
      updatePackingItem,
      deletePackingItem,
      addExpense,
      updateExpense,
      deleteExpense,
    }),
    [
      trips,
      activeTrip,
      createTrip,
      updateTrip,
      deleteTrip,
      addActivity,
      updateActivity,
      deleteActivity,
      addPackingItem,
      updatePackingItem,
      deletePackingItem,
      addExpense,
      updateExpense,
      deleteExpense,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
