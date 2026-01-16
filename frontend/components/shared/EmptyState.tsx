interface EmptyStateProps {
  icon?: string
  title: string
  message: string
}

export default function EmptyState({ icon = '📋', title, message }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}
