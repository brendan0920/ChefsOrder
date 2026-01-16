import { OrderStatus } from '@/types'
import { getStatusClass, capitalize } from '@/lib/utils'

interface StatusBadgeProps {
  status: OrderStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {capitalize(status)}
    </span>
  )
}
