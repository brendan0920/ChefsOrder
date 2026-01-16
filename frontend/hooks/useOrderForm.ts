import { useState } from 'react'
import { OrderItem } from '@/types'

export function useOrderForm() {
  const [selectedVendor, setSelectedVendor] = useState('')
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0])
  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: '1', ingredient: '', quantity: '', unit: 'lbs', notes: '' }
  ])
  const [specialInstructions, setSpecialInstructions] = useState('')

  const addOrderItem = () => {
    setOrderItems([...orderItems, {
      id: Date.now().toString(),
      ingredient: '',
      quantity: '',
      unit: 'lbs',
      notes: ''
    }])
  }

  const removeOrderItem = (id: string) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter(item => item.id !== id))
    }
  }

  const updateOrderItem = (id: string, field: keyof OrderItem, value: string) => {
    setOrderItems(orderItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const resetForm = () => {
    setSelectedVendor('')
    setOrderDate(new Date().toISOString().split('T')[0])
    setDeliveryDate('')
    setOrderItems([{ id: '1', ingredient: '', quantity: '', unit: 'lbs', notes: '' }])
    setSpecialInstructions('')
  }

  return {
    selectedVendor,
    setSelectedVendor,
    orderDate,
    setOrderDate,
    deliveryDate,
    setDeliveryDate,
    orderItems,
    specialInstructions,
    setSpecialInstructions,
    addOrderItem,
    removeOrderItem,
    updateOrderItem,
    resetForm,
  }
}
