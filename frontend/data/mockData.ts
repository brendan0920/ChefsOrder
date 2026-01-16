import { Order, Vendor, Message, Conversation } from '@/types'

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'ABC Produce Co.',
    category: 'Produce',
    contact: 'John Smith',
    email: 'john@abcproduce.com',
    phone: '(555) 123-4567',
    address: '123 Market St, City, ST 12345',
    rating: 4.8,
    totalOrders: 45,
    status: 'active',
  },
  {
    id: '2',
    name: 'Fresh Market Supplies',
    category: 'General',
    contact: 'Sarah Johnson',
    email: 'sarah@freshmarket.com',
    phone: '(555) 234-5678',
    address: '456 Commerce Ave, City, ST 12345',
    rating: 4.6,
    totalOrders: 32,
    status: 'active',
  },
  {
    id: '3',
    name: 'Premium Meats & Seafood',
    category: 'Meat & Seafood',
    contact: 'Mike Davis',
    email: 'mike@premiummeats.com',
    phone: '(555) 345-6789',
    address: '789 Food Blvd, City, ST 12345',
    rating: 4.9,
    totalOrders: 28,
    status: 'active',
  },
  {
    id: '4',
    name: 'Organic Farm Direct',
    category: 'Produce',
    contact: 'Emily Chen',
    email: 'emily@organicfarm.com',
    phone: '(555) 456-7890',
    address: '321 Farm Road, City, ST 12345',
    rating: 4.7,
    totalOrders: 19,
    status: 'active',
  },
  {
    id: '5',
    name: 'Bulk Ingredients Warehouse',
    category: 'Dry Goods',
    contact: 'Robert Wilson',
    email: 'robert@bulkingredients.com',
    phone: '(555) 567-8901',
    address: '654 Warehouse Way, City, ST 12345',
    rating: 4.5,
    totalOrders: 15,
    status: 'active',
  },
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    vendor: 'ABC Produce Co.',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    status: 'delivered',
    totalItems: 12,
    totalAmount: '$1,245.50',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    vendor: 'Fresh Market Supplies',
    orderDate: '2024-01-16',
    deliveryDate: '2024-01-18',
    status: 'confirmed',
    totalItems: 8,
    totalAmount: '$890.25',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    vendor: 'Premium Meats & Seafood',
    orderDate: '2024-01-17',
    deliveryDate: '2024-01-19',
    status: 'pending',
    totalItems: 15,
    totalAmount: '$2,150.00',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    vendor: 'Organic Farm Direct',
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-12',
    status: 'delivered',
    totalItems: 6,
    totalAmount: '$675.80',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    vendor: 'Bulk Ingredients Warehouse',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-16',
    status: 'cancelled',
    totalItems: 10,
    totalAmount: '$1,100.00',
  },
]

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    vendor: 'ABC Produce Co.',
    subject: 'Order ORD-2024-001 Confirmation',
    preview: 'Your order has been confirmed and will be delivered on...',
    timestamp: '2024-01-15T10:30:00',
    unread: true,
    orderNumber: 'ORD-2024-001',
  },
  {
    id: '2',
    vendor: 'Fresh Market Supplies',
    subject: 'Delivery Schedule Update',
    preview: 'We need to reschedule your delivery to...',
    timestamp: '2024-01-16T14:20:00',
    unread: true,
  },
  {
    id: '3',
    vendor: 'Premium Meats & Seafood',
    subject: 'Product Availability Inquiry',
    preview: 'Thank you for your inquiry. We currently have...',
    timestamp: '2024-01-17T09:15:00',
    unread: false,
  },
  {
    id: '4',
    vendor: 'Organic Farm Direct',
    subject: 'Order ORD-2024-004 Delivered',
    preview: 'Your order has been successfully delivered. Please confirm...',
    timestamp: '2024-01-12T16:45:00',
    unread: false,
    orderNumber: 'ORD-2024-004',
  },
  {
    id: '5',
    vendor: 'Bulk Ingredients Warehouse',
    subject: 'New Product Catalog',
    preview: 'We are excited to share our new product catalog...',
    timestamp: '2024-01-10T11:00:00',
    unread: false,
  },
]

// Mock Conversations
export const mockConversations: Record<string, Conversation> = {
  '1': {
    id: '1',
    vendor: 'ABC Produce Co.',
    messages: [
      {
        id: 'm1',
        sender: 'vendor',
        text: 'Your order ORD-2024-001 has been confirmed and will be delivered on January 17, 2024 between 9:00 AM and 12:00 PM.',
        timestamp: '2024-01-15T10:30:00',
      },
      {
        id: 'm2',
        sender: 'you',
        text: 'Thank you for the confirmation. Please ensure all items are fresh and properly packaged.',
        timestamp: '2024-01-15T10:45:00',
      },
      {
        id: 'm3',
        sender: 'vendor',
        text: 'Absolutely! We guarantee the freshness of all our produce. You will receive a notification when the delivery is on the way.',
        timestamp: '2024-01-15T11:00:00',
      },
    ],
  },
  '2': {
    id: '2',
    vendor: 'Fresh Market Supplies',
    messages: [
      {
        id: 'm1',
        sender: 'vendor',
        text: 'We need to reschedule your delivery to January 19, 2024 due to weather conditions. Is this acceptable?',
        timestamp: '2024-01-16T14:20:00',
      },
    ],
  },
}

// Helper to get vendor names for dropdowns
export function getVendorNames(): string[] {
  return mockVendors.map(v => v.name)
}
