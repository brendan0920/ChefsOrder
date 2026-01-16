'use client'

import { useState } from 'react'
import Link from 'next/link'
import { OrderItem } from '@/types'
import { UNITS } from '@/lib/constants'
import { getVendorNames } from '@/data/mockData'
import OrderItemCard from './OrderItemCard'

interface OrderFormProps {
  onSubmit?: (data: OrderFormData) => void
}

export interface OrderFormData {
  vendor: string
  orderDate: string
  deliveryDate: string
  items: OrderItem[]
  specialInstructions: string
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [selectedVendor, setSelectedVendor] = useState('')
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0])
  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: '1', ingredient: '', quantity: '', unit: 'lbs', notes: '' }
  ])
  const [specialInstructions, setSpecialInstructions] = useState('')

  const vendors = getVendorNames()

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData: OrderFormData = {
      vendor: selectedVendor,
      orderDate,
      deliveryDate,
      items: orderItems,
      specialInstructions,
    }
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      {/* Vendor Selection */}
      <div className="form-section">
        <label htmlFor="vendor" className="form-label">
          Select Vendor <span className="required">*</span>
        </label>
        <select
          id="vendor"
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Choose a vendor...</option>
          {vendors.map(vendor => (
            <option key={vendor} value={vendor}>{vendor}</option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="orderDate" className="form-label">
            Order Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryDate" className="form-label">
            Delivery Date
          </label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {/* Order Items */}
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">Order Items</h2>
          <button
            type="button"
            onClick={addOrderItem}
            className="btn-add-item"
          >
            + Add Item
          </button>
        </div>

        <div className="order-items">
          {orderItems.map((item, index) => (
            <OrderItemCard
              key={item.id}
              item={item}
              index={index}
              units={UNITS}
              onUpdate={(field, value) => updateOrderItem(item.id, field, value)}
              onRemove={orderItems.length > 1 ? () => removeOrderItem(item.id) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      <div className="form-section">
        <label htmlFor="specialInstructions" className="form-label">
          Special Instructions
        </label>
        <textarea
          id="specialInstructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          className="form-textarea"
          rows={4}
          placeholder="Any additional notes or special delivery instructions..."
        />
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <Link href="/" className="btn-cancel">
          Cancel
        </Link>
        <button type="submit" className="btn-submit">
          Submit Order
        </button>
      </div>
    </form>
  )
}
