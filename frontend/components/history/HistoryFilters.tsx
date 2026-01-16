import SearchBox from '@/components/shared/SearchBox'
import { Order } from '@/types'

interface HistoryFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  vendorFilter: string
  onVendorFilterChange: (value: string) => void
  orders: Order[]
}

export default function HistoryFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  vendorFilter,
  onVendorFilterChange,
  orders,
}: HistoryFiltersProps) {
  const vendors = ['all', ...Array.from(new Set(orders.map(o => o.vendor)))]

  return (
    <div className="history-controls">
      <SearchBox
        placeholder="Search by order number or vendor..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      <div className="filter-group">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={vendorFilter}
          onChange={(e) => onVendorFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Vendors</option>
          {vendors.filter(v => v !== 'all').map(vendor => (
            <option key={vendor} value={vendor}>{vendor}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
