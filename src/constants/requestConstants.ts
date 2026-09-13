import type { RequestStatus } from '../types'

export const statusConfig: Record<RequestStatus, { label: string; tone: string }> = {
  NEW: { label: 'New', tone: 'blue' },
  CONTACTED: { label: 'Contacted', tone: 'cyan' },
  SITE_VISIT: { label: 'Site Visit', tone: 'purple' },
  REQUIREMENTS: { label: 'Requirements', tone: 'indigo' },
  FOLLOW_UP: { label: 'Follow Up', tone: 'amber' },
  QUOTATION_PENDING: { label: 'Quotation Pending', tone: 'orange' },
  CONFIRMED: { label: 'Confirmed', tone: 'green' },
  IN_PROGRESS: { label: 'In Progress', tone: 'teal' },
  COMPLETED: { label: 'Completed', tone: 'success' },
  CANCELLED: { label: 'Cancelled', tone: 'red' },
}

export const statuses = Object.keys(statusConfig) as RequestStatus[]
export const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const
export const sources = ['GOOGLE_ADS', 'WHATSAPP', 'WEBSITE', 'PHONE', 'REFERRAL', 'WALK_IN', 'EXISTING_CUSTOMER', 'OTHER'] as const
export const requestTypes = ['NEW_ENQUIRY', 'PRODUCT_REQUIREMENT', 'QUOTATION_REQUEST', 'SERVICE', 'INSTALLATION', 'COMPLAINT', 'MODIFICATION', 'OTHER'] as const
export const products = ['UPVC_WINDOWS', 'UPVC_DOORS', 'SLIDING_WINDOWS', 'CASEMENT_WINDOWS', 'GLASS_WINDOWS', 'PARTITIONS', 'CABINS', 'CEILINGS', 'COMMERCIAL_PROJECT', 'OTHER'] as const
export const customerTypes = ['INDIVIDUAL', 'RESORT', 'INTERIOR_DESIGNER', 'COMMERCIAL', 'BUILDER', 'CONTRACTOR', 'OTHER'] as const

export const labelize = (value?: string) =>
  value ? value.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : '—' 