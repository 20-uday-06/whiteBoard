'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Smile } from 'lucide-react'
import { ChatMessage, User } from '../types'
import { Button } from './ui/Button'

interface ChatProps {
  messages: ChatMessage[]
  users: User[]
  onSendMessage: (message: string) => void
  onClose: () => void
}

const Chat: React.FC<ChatProps> = ({ messages, users, onSendMessage, onClose }) => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      onSendMessage(inputMessage)
      setInputMessage('')
    }
  }

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm">
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-500 text-sm py-8"
            >
              <Smile className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No messages yet.</p>
              <p>Start the conversation!</p>
            </motion.div>
          ) : (
            messages.map((message, index) => {
              const user = users.find(u => u.id === message.userId)
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col group"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: user?.color || '#666' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span 
                      className="font-medium text-sm"
                      style={{ color: user?.color || '#666' }}
                    >
                      {message.username}
                    </span>
                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-lg px-3 py-2 text-sm shadow-sm border border-white/20 ml-4"
                  >
                    {message.message}
                  </motion.div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onSubmit={handleSendMessage}
        className="p-4 border-t border-white/20"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
          />
          <Button
            type="submit"
            disabled={!inputMessage.trim()}
            size="sm"
            className="px-4 py-3"
            leftIcon={<Send size={16} />}
          >
            Send
          </Button>
        </div>
      </motion.form>
    </div>
  )
}

export default Chat
