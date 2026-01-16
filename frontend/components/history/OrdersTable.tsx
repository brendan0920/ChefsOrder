import { Order } from '@/types'
import StatusBadge from '@/components/shared/StatusBadge'
import { formatDate } from '@/lib/utils'

interface OrdersTableProps {
  orders: Order[]
  onViewDetails?: (orderId: string) => void
}

export default function OrdersTable({ orders, onViewDetails }: OrdersTableProps) {
  if (orders.length === 0) {
    return null
  }

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Vendor</th>
          <th>Order Date</th>
          <th>Delivery Date</th>
          <th>Items</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td className="order-number">{order.orderNumber}</td>
            <td>{order.vendor}</td>
            <td>{formatDate(order.orderDate)}</td>
            <td>{order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}</td>
            <td>{order.totalItems}</td>
            <td className="amount">{order.totalAmount}</td>
            <td>
              <StatusBadge status={order.status} />
            </td>
            <td>
              <button 
                className="btn-view"
                onClick={() => onViewDetails?.(order.id)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
