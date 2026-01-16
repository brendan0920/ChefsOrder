import { useMemo } from 'react'
import { Order } from '@/types'

interface UseFilteredOrdersProps {
  orders: Order[]
  searchTerm: string
  statusFilter: string
  vendorFilter: string
}

export function useFilteredOrders({ orders, searchTerm, statusFilter, vendorFilter }: UseFilteredOrdersProps) {
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesVendor = vendorFilter === 'all' || order.vendor === vendorFilter
      return matchesSearch && matchesStatus && matchesVendor
    })
  }, [orders, searchTerm, statusFilter, vendorFilter])

  return filteredOrders
}
