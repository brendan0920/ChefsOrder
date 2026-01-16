'use client'

import PageHeader from '@/components/shared/PageHeader'
import OrderForm, { OrderFormData } from '@/components/order/OrderForm'

export default function OrderPage() {
  const handleSubmit = (data: OrderFormData) => {
    // In a real app, this would call an API
    console.log('Order submitted:', data)
    alert('Order submitted successfully!')
  }

  return (
    <div className="order-page">
      <div className="container">
        <PageHeader
          title="Create New Order"
          subtitle="Fill out the form below to send an order to your vendor"
        />
        <OrderForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
