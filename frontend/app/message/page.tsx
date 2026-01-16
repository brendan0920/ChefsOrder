'use client'

import { useState } from 'react'
import MessageList from '@/components/messages/MessageList'
import ConversationView from '@/components/messages/ConversationView'
import { mockMessages, mockConversations } from '@/data/mockData'

export default function MessagePage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const currentConversation = selectedMessage ? mockConversations[selectedMessage] : null
  const currentMessage = selectedMessage ? mockMessages.find(m => m.id === selectedMessage) : null

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const handleViewOrder = (orderNumber: string) => {
    // Navigate to order details or history
    console.log('View order:', orderNumber)
  }

  return (
    <div className="message-page">
      <div className="messages-container">
        <div className="messages-sidebar">
          <div className="messages-header">
            <h2>Messages</h2>
            <button className="btn-new-message">+ New Message</button>
          </div>
          <MessageList
            messages={mockMessages}
            selectedMessageId={selectedMessage}
            onSelectMessage={setSelectedMessage}
          />
        </div>

        <div className="conversation-view">
          <ConversationView
            conversation={currentConversation || null}
            message={currentMessage || null}
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
            onViewOrder={handleViewOrder}
          />
        </div>
      </div>
    </div>
  )
}
