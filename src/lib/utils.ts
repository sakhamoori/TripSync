import type {
  ActivityCategory,
  ExpenseCategory,
  PackingCategory,
  Trip,
} from '../types'

export const uid = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export function todayISO(): string {
  return toISODate(new Date())
}

export function toISODate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

export function dateRange(startISO: string, endISO: string): string[] {
  if (!startISO || !endISO) return []
  const out: string[] = []
  let cur = startISO
  for (let i = 0; i < 400 && cur <= endISO; i++) {
    out.push(cur)
    cur = addDays(cur, 1)
  }
  return out
}

export function tripLength(trip: Pick<Trip, 'startDate' | 'endDate'>): number {
  return dateRange(trip.startDate, trip.endDate).length
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  if (!iso) return ''
  return parseISODate(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    ...opts,
  })
}

export function formatDateRange(startISO: string, endISO: string): string {
  if (!startISO || !endISO) return 'Dates TBD'
  const start = parseISODate(startISO)
  const end = parseISODate(endISO)
  const sameYear = start.getFullYear() === end.getFullYear()
  const left = formatDate(startISO)
  const right = formatDate(endISO, { year: 'numeric' })
  return sameYear && start.getFullYear() === new Date().getFullYear()
    ? `${left} – ${formatDate(endISO)}`
    : `${left} – ${right}`
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

export function formatTime(hhmm: string): string {
  if (!hhmm) return ''
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export function daysUntil(iso: string): number {
  if (!iso) return 0
  const ms = parseISODate(iso).getTime() - parseISODate(todayISO()).getTime()
  return Math.round(ms / 86_400_000)
}

export type TripStatus = 'upcoming' | 'active' | 'past'

export function tripStatus(trip: Trip): TripStatus {
  const today = todayISO()
  if (trip.endDate && trip.endDate < today) return 'past'
  if (trip.startDate && trip.startDate > today) return 'upcoming'
  return 'active'
}

export const ACTIVITY_META: Record<ActivityCategory, { label: string }> = {
  sightseeing: { label: 'Sightseeing' },
  food: { label: 'Food & drink' },
  transport: { label: 'Transport' },
  stay: { label: 'Stay' },
  outdoors: { label: 'Outdoors' },
  other: { label: 'Other' },
}

export const PACKING_META: Record<PackingCategory, { label: string }> = {
  essentials: { label: 'Essentials' },
  clothing: { label: 'Clothing' },
  toiletries: { label: 'Toiletries' },
  tech: { label: 'Tech' },
  documents: { label: 'Documents' },
  other: { label: 'Other' },
}

export const EXPENSE_META: Record<ExpenseCategory, { label: string; color: string }> = {
  lodging: { label: 'Lodging', color: '#6366f1' },
  food: { label: 'Food', color: '#f59e0b' },
  transport: { label: 'Transport', color: '#0ea5e9' },
  activities: { label: 'Activities', color: '#10b981' },
  shopping: { label: 'Shopping', color: '#ec4899' },
  other: { label: 'Other', color: '#94a3b8' },
}

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'CHF', 'SGD', 'MXN']

export function clsx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}
