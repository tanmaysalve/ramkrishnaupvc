import { Chip } from '@mui/material'
import { statusConfig, labelize } from '../../constants/requestConstants'
import type { RequestStatus, Priority } from '../../types'

export function StatusBadge({ status }: { status: RequestStatus }) {
  const cfg = statusConfig[status]
  return <Chip size="small" label={cfg?.label ?? labelize(status)} className={`status-chip ${cfg?.tone ?? ''}`} />
}
export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Chip size="small" label={labelize(priority)} className={`priority-chip priority-${priority.toLowerCase()}`} />
}