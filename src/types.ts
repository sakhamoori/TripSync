export type ID = string

export type ActivityCategory =
  | 'sightseeing'
  | 'food'
  | 'transport'
  | 'stay'
  | 'outdoors'
  | 'other'

export type PackingCategory =
  | 'essentials'
  | 'clothing'
  | 'toiletries'
  | 'tech'
  | 'documents'
  | 'other'

export type ExpenseCategory =
  | 'lodging'
  | 'food'
  | 'transport'
  | 'activities'
  | 'shopping'
  | 'other'

export interface Activity {
  id: ID
  /** yyyy-mm-dd */
  date: string
  /** HH:mm, optional — untimed activities sort to the end of the day */
  time: string
  title: string
  location: string
  category: ActivityCategory
  notes: string
  done: boolean
}

export interface PackingItem {
  id: ID
  label: string
  category: PackingCategory
  qty: number
  packed: boolean
}

export interface Expense {
  id: ID
  label: string
  /** in the trip's currency */
  amount: number
  category: ExpenseCategory
  /** yyyy-mm-dd */
  date: string
}

export interface Trip {
  id: ID
  title: string
  destination: string
  /** yyyy-mm-dd */
  startDate: string
  /** yyyy-mm-dd */
  endDate: string
  emoji: string
  notes: string
  currency: string
  budget: number
  travelers: number
  createdAt: string
  activities: Activity[]
  packing: PackingItem[]
  expenses: Expense[]
}

export interface Destination {
  id: ID
  name: string
  country: string
  region: string
  emoji: string
  blurb: string
  bestMonths: string
  /** rough daily spend per person, USD */
  dailyBudgetUsd: number
  tags: string[]
  highlights: string[]
  photoUrl: string
}
