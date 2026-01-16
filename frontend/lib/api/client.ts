/**
 * API Client - Centralized API calls
 * Replace mock data imports with these functions when backend is ready
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// ============ ORDERS ============

export interface OrderItemDto {
  id?: number
  ingredientName: string
  quantity: number
  unit: string
  unitPrice?: number
  totalPrice?: number
  notes?: string
}

export interface OrderDto {
  id: number
  userId: number
  userName: string
  vendorId: number
  vendorName: string
  orderNumber: string
  orderDate: string
  deliveryDate?: string
  status: string
  notes?: string
  totalAmount?: number
  orderItems: OrderItemDto[]
  createdAt: string
}

export interface CreateOrderDto {
  vendorId: number
  deliveryDate?: string
  notes?: string
  orderItems: Omit<OrderItemDto, 'id' | 'totalPrice'>[]
}

export const ordersApi = {
  getAll: (userId?: number) => 
    fetchApi<OrderDto[]>(`/orders${userId ? `?userId=${userId}` : ''}`),
  
  getById: (id: number) => 
    fetchApi<OrderDto>(`/orders/${id}`),
  
  create: (data: CreateOrderDto) => 
    fetchApi<OrderDto>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  
  updateStatus: (id: number, status: string) => 
    fetchApi<void>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(status) }),
  
  delete: (id: number) => 
    fetchApi<void>(`/orders/${id}`, { method: 'DELETE' }),
}

// ============ VENDORS ============

export interface VendorDto {
  id: number
  name: string
  category: string
  contactPerson: string
  email: string
  phone: string
  address: string
  rating: number
  totalOrders: number
  isActive: boolean
}

export interface CreateVendorDto {
  name: string
  category: string
  contactPerson: string
  email: string
  phone: string
  address?: string
}

export const vendorsApi = {
  getAll: () => 
    fetchApi<VendorDto[]>('/vendors'),
  
  getById: (id: number) => 
    fetchApi<VendorDto>(`/vendors/${id}`),
  
  create: (data: CreateVendorDto) => 
    fetchApi<VendorDto>('/vendors', { method: 'POST', body: JSON.stringify(data) }),
  
  update: (id: number, data: Partial<CreateVendorDto>) => 
    fetchApi<VendorDto>(`/vendors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  
  delete: (id: number) => 
    fetchApi<void>(`/vendors/${id}`, { method: 'DELETE' }),
}

// ============ MESSAGES ============

export interface MessageDto {
  id: number
  userId: number
  vendorId?: number
  vendorName?: string
  orderId?: number
  orderNumber?: string
  subject: string
  content: string
  isRead: boolean
  createdAt: string
}

export const messagesApi = {
  getAll: (userId?: number) => 
    fetchApi<MessageDto[]>(`/messages${userId ? `?userId=${userId}` : ''}`),
  
  getById: (id: number) => 
    fetchApi<MessageDto>(`/messages/${id}`),
  
  markAsRead: (id: number) => 
    fetchApi<void>(`/messages/${id}/read`, { method: 'PUT' }),
}

// ============ USERS ============

export interface UserDto {
  id: number
  username: string
  email: string
  restaurantName?: string
}

export const usersApi = {
  getCurrent: () => 
    fetchApi<UserDto>('/users/me'),
  
  update: (data: Partial<UserDto>) => 
    fetchApi<UserDto>('/users/me', { method: 'PUT', body: JSON.stringify(data) }),
}
