import { OrderItem } from '@/types'

interface OrderItemCardProps {
  item: OrderItem
  index: number
  units: readonly string[]
  onUpdate: (field: keyof OrderItem, value: string) => void
  onRemove?: () => void
}

export default function OrderItemCard({ item, index, units, onUpdate, onRemove }: OrderItemCardProps) {
  return (
    <div className="order-item-card">
      <div className="item-number">#{index + 1}</div>
      <div className="item-fields">
        <div className="form-group">
          <label className="form-label">Ingredient <span className="required">*</span></label>
          <input
            type="text"
            value={item.ingredient}
            onChange={(e) => onUpdate('ingredient', e.target.value)}
            className="form-input"
            placeholder="e.g., Organic Tomatoes"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Quantity <span className="required">*</span></label>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => onUpdate('quantity', e.target.value)}
            className="form-input"
            placeholder="0"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Unit</label>
          <select
            value={item.unit}
            onChange={(e) => onUpdate('unit', e.target.value)}
            className="form-select"
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div className="form-group form-group-full">
          <label className="form-label">Notes</label>
          <input
            type="text"
            value={item.notes}
            onChange={(e) => onUpdate('notes', e.target.value)}
            className="form-input"
            placeholder="Special instructions for this item..."
          />
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="btn-remove-item"
          aria-label="Remove item"
        >
          ×
        </button>
      )}
    </div>
  )
}
