'use client'

import { useState } from 'react'
import PageHeader from '@/components/shared/PageHeader'
import SearchBox from '@/components/shared/SearchBox'
import EmptyState from '@/components/shared/EmptyState'
import VendorCard from '@/components/vendors/VendorCard'
import VendorModal from '@/components/vendors/VendorModal'
import { mockVendors } from '@/data/mockData'
import { VENDOR_CATEGORIES } from '@/lib/constants'

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const categories = ['all', ...Array.from(new Set(mockVendors.map(v => v.category)))]

  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleViewDetails = (vendorId: string) => {
    console.log('View vendor details:', vendorId)
  }

  const handleEdit = (vendorId: string) => {
    console.log('Edit vendor:', vendorId)
  }

  const handlePlaceOrder = (vendorId: string) => {
    // Navigate to order page with vendor pre-selected
    window.location.href = `/order?vendor=${vendorId}`
  }

  return (
    <div className="vendors-page">
      <div className="container">
        <PageHeader
          title="Vendors & Purveyors"
          subtitle="Manage your vendor relationships and contact information"
          action={
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              + Add New Vendor
            </button>
          }
        />

        <div className="vendors-controls">
          <SearchBox
            placeholder="Search vendors by name, category, or contact..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="vendors-grid">
          {filteredVendors.length === 0 ? (
            <EmptyState
              icon="🏪"
              title="No vendors found"
              message="Try adjusting your search or filter criteria"
            />
          ) : (
            filteredVendors.map(vendor => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onPlaceOrder={handlePlaceOrder}
              />
            ))
          )}
        </div>

        <VendorModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Vendor"
        />
      </div>
    </div>
  )
}
