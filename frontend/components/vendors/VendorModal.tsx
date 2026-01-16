interface VendorModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
}

export default function VendorModal({ isOpen, onClose, title, children }: VendorModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children || <p>Form will be implemented here...</p>}
        </div>
      </div>
    </div>
  )
}
