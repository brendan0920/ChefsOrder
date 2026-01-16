// Order Types
export interface OrderItem {
  id: string
  ingredient: string
  quantity: string
  unit: string
  notes: string
}

export interface Order {
  id: string
  orderNumber: string
  vendor: string
  orderDate: string
  deliveryDate: string
  status: OrderStatus
  totalItems: number
  totalAmount: string
  items?: OrderItem[]
  specialInstructions?: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled'

// Vendor Types
export interface Vendor {
  id: string
  name: string
  category: string
  contact: string
  email: string
  phone: string
  address: string
  rating: number
  totalOrders: number
  status: 'active' | 'inactive'
}

// Message Types
export interface Message {
  id: string
  vendor: string
  subject: string
  preview: string
  timestamp: string
  unread: boolean
  orderNumber?: string
}

export interface ConversationMessage {
  id: string
  sender: 'you' | 'vendor'
  text: string
  timestamp: string
}

export interface Conversation {
  id: string
  vendor: string
  messages: ConversationMessage[]
}
