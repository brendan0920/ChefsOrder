import { Conversation, Message } from '@/types'
import { formatRelativeTime } from '@/lib/utils'

interface ConversationViewProps {
  conversation: Conversation | null
  message: Message | null
  newMessage: string
  onMessageChange: (value: string) => void
  onSendMessage: () => void
  onViewOrder?: (orderNumber: string) => void
}

export default function ConversationView({
  conversation,
  message,
  newMessage,
  onMessageChange,
  onSendMessage,
  onViewOrder,
}: ConversationViewProps) {
  if (!conversation || !message) {
    return (
      <div className="empty-conversation">
        <div className="empty-icon">💬</div>
        <h3>Select a message to view conversation</h3>
        <p>Choose a message from the list to start reading and replying</p>
      </div>
    )
  }

  return (
    <>
      <div className="conversation-header">
        <div>
          <h2>{message.vendor}</h2>
          {message.orderNumber && (
            <span className="order-badge">{message.orderNumber}</span>
          )}
        </div>
        {message.orderNumber && (
          <button className="btn-action" onClick={() => onViewOrder?.(message.orderNumber!)}>
            View Order
          </button>
        )}
      </div>
      <div className="conversation-messages">
        {conversation.messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.sender}`}>
            <div className="message-text">{msg.text}</div>
            <div className="message-timestamp">{formatRelativeTime(msg.timestamp)}</div>
          </div>
        ))}
      </div>
      <div className="conversation-input">
        <textarea
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type your message..."
          className="message-textarea"
          rows={3}
        />
        <button onClick={onSendMessage} className="btn-send">
          Send
        </button>
      </div>
    </>
  )
}
