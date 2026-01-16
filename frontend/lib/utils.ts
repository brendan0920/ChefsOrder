import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { OrderStatus } from '@/types'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a timestamp into a human-readable relative time
 */
export function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (days === 1) {
    return 'Yesterday'
  } else if (days < 7) {
    return `${days} days ago`
  } else {
    return date.toLocaleDateString()
  }
}

/**
 * Formats a date string to a localized date format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}

/**
 * Gets the CSS class for an order status badge
 */
export function getStatusClass(status: OrderStatus): string {
  const statusClasses: Record<OrderStatus, string> = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    delivered: 'status-delivered',
    cancelled: 'status-cancelled',
  }
  return statusClasses[status]
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Renders star rating as a string
 */
export function renderStars(rating: number): string {
  const fullStars = Math.floor(rating)
  const emptyStars = 5 - fullStars
  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars)
}
