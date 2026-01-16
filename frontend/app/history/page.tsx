'use client'

import { useState } from 'react'
import PageHeader from '@/components/shared/PageHeader'
import EmptyState from '@/components/shared/EmptyState'
import HistoryFilters from '@/components/history/HistoryFilters'
import OrdersTable from '@/components/history/OrdersTable'
import HistoryStats from '@/components/history/HistoryStats'
import { useFilteredOrders } from '@/hooks/useFilteredOrders'
import { mockOrders } from '@/data/mockData'

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [vendorFilter, setVendorFilter] = useState<string>('all')

  const filteredOrders = useFilteredOrders({
    orders: mockOrders,
    searchTerm,
    statusFilter,
    vendorFilter,
  })

  const handleViewDetails = (orderId: string) => {
    // In a real app, this would navigate to order details
    console.log('View order details:', orderId)
  }

  return (
    <div className="history-page">
      <div className="container">
        <PageHeader
          title="Order History"
          subtitle="View and manage all your past and current orders"
        />

        <HistoryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          vendorFilter={vendorFilter}
          onVendorFilterChange={setVendorFilter}
          orders={mockOrders}
        />

        <div className="orders-table-container">
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon="📋"
              title="No orders found"
              message="Try adjusting your search or filter criteria"
            />
          ) : (
            <OrdersTable orders={filteredOrders} onViewDetails={handleViewDetails} />
          )}
        </div>

        <HistoryStats orders={mockOrders} />
      </div>
    </div>
  )
}
