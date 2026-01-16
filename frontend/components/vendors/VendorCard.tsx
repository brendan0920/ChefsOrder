import { Vendor } from '@/types'
import { renderStars } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface VendorCardProps {
  vendor: Vendor
  onViewDetails?: (vendorId: string) => void
  onEdit?: (vendorId: string) => void
  onPlaceOrder?: (vendorId: string) => void
}

export default function VendorCard({ vendor, onViewDetails, onEdit, onPlaceOrder }: VendorCardProps) {
  return (
    <Card hover className="p-8">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{vendor.name}</h3>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              {vendor.category}
            </span>
          </div>
          <span
            className={cn(
              'px-3 py-1 rounded-full text-sm font-semibold capitalize',
              vendor.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            )}
          >
            {vendor.status}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <span className="text-yellow-400 text-xl">{renderStars(vendor.rating)}</span>
          <span className="font-semibold text-gray-900">{vendor.rating}</span>
          <span className="text-gray-600 text-sm">({vendor.totalOrders} orders)</span>
        </div>

        {/* Details */}
        <div className="mb-6 space-y-3">
          <div className="flex text-sm">
            <span className="font-semibold text-gray-600 min-w-[80px]">Contact:</span>
            <span className="text-gray-900">{vendor.contact}</span>
          </div>
          <div className="flex text-sm">
            <span className="font-semibold text-gray-600 min-w-[80px]">Email:</span>
            <a
              href={`mailto:${vendor.email}`}
              className="text-primary-500 hover:underline"
            >
              {vendor.email}
            </a>
          </div>
          <div className="flex text-sm">
            <span className="font-semibold text-gray-600 min-w-[80px]">Phone:</span>
            <a
              href={`tel:${vendor.phone}`}
              className="text-primary-500 hover:underline"
            >
              {vendor.phone}
            </a>
          </div>
          <div className="flex text-sm">
            <span className="font-semibold text-gray-600 min-w-[80px]">Address:</span>
            <span className="text-gray-900">{vendor.address}</span>
          </div>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-0 pt-4 flex gap-2 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => onViewDetails?.(vendor.id)}>
          View Details
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit?.(vendor.id)}>
          Edit
        </Button>
        <Button variant="primary" size="sm" onClick={() => onPlaceOrder?.(vendor.id)}>
          Place Order
        </Button>
      </CardFooter>
    </Card>
  )
}
