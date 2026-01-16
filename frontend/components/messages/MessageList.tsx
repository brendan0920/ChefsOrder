import { Message } from '@/types'
import { formatRelativeTime } from '@/lib/utils'

interface MessageListProps {
  messages: Message[]
  selectedMessageId: string | null
  onSelectMessage: (messageId: string) => void
}

export default function MessageList({ messages, selectedMessageId, onSelectMessage }: MessageListProps) {
  return (
    <div className="messages-list">
      {messages.map(message => (
        <div
          key={message.id}
          className={`message-item ${selectedMessageId === message.id ? 'active' : ''} ${message.unread ? 'unread' : ''}`}
          onClick={() => onSelectMessage(message.id)}
        >
          <div className="message-item-header">
            <h3 className="message-vendor">{message.vendor}</h3>
            <span className="message-time">{formatRelativeTime(message.timestamp)}</span>
          </div>
          {message.orderNumber && (
            <span className="message-order-badge">{message.orderNumber}</span>
          )}
          <p className="message-subject">{message.subject}</p>
          <p className="message-preview">{message.preview}</p>
          {message.unread && <span className="unread-indicator"></span>}
        </div>
      ))}
    </div>
  )
}
