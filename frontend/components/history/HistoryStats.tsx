import { Order } from '@/types'

interface HistoryStatsProps {
  orders: Order[]
}

export default function HistoryStats({ orders }: HistoryStatsProps) {
  const deliveredCount = orders.filter(o => o.status === 'delivered').length
  const inProgressCount = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length

  return (
    <div className="history-stats">
      <div className="stat-card">
        <div className="stat-value">{orders.length}</div>
        <div className="stat-label">Total Orders</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{deliveredCount}</div>
        <div className="stat-label">Delivered</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{inProgressCount}</div>
        <div className="stat-label">In Progress</div>
      </div>
    </div>
  )
}
