'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Smile } from 'lucide-react'
import { ChatMessage, User } from '../types'
import { Button } from './ui/Button'

interface ChatProps {
  messages: ChatMessage[]
  users: User[]
  currentUserId?: string
  onSendMessage: (message: string) => void
  onClose: () => void
}

const Chat: React.FC<ChatProps> = ({ messages, users, currentUserId, onSendMessage, onClose }) => {
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
    return new Date(timestamp).toLocaleTimeString([], {      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50/95 to-white/95 backdrop-blur-xl">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-500 text-sm py-12"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Smile className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              </motion.div>
              <p className="text-lg font-medium mb-1">Chat is empty</p>
              <p>Start the conversation!</p>
            </motion.div>          ) : (            messages.map((message, index) => {
              const user = users.find(u => u.id === message.userId)
              const isCurrentUser = currentUserId && user?.id === currentUserId
              const prevMessage = messages[index - 1]
              const nextMessage = messages[index + 1]
              const isFirstInGroup = !prevMessage || prevMessage.userId !== message.userId
              const isLastInGroup = !nextMessage || nextMessage.userId !== message.userId
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: isCurrentUser ? 20 : -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'} ${
                    isLastInGroup ? 'mb-4' : 'mb-1'
                  }`}
                >
                  {/* Avatar for other users (left side) - only show on last message in group */}
                  {!isCurrentUser && (
                    <motion.div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0 transition-opacity ${
                        isLastInGroup ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ 
                        backgroundColor: user?.color || '#666',
                        border: `2px solid ${user?.color || '#666'}`,
                        boxShadow: `0 2px 12px ${user?.color || '#666'}30`
                      }}
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: isLastInGroup ? 1 : 0 }}
                      transition={{ delay: index * 0.03 + 0.1 }}
                    >
                      {message.username.charAt(0).toUpperCase()}
                    </motion.div>
                  )}
                  
                  <div className={`max-w-[70%] ${isCurrentUser ? 'mr-2' : 'ml-1'}`}>
                    {/* Username and timestamp - only show on first message in group */}
                    {isFirstInGroup && (
                      <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <span 
                          className="font-bold text-xs tracking-wide uppercase"
                          style={{ color: user?.color || '#666' }}
                        >
                          {isCurrentUser ? 'You' : message.username}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ delay: index * 0.03 + 0.05 }}
                      className={`relative px-4 py-3 shadow-md ${
                        isCurrentUser 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                          : 'bg-white text-gray-800 border-2'
                      } ${
                        isFirstInGroup && isLastInGroup ? 'rounded-2xl' :
                        isFirstInGroup ? (isCurrentUser ? 'rounded-2xl rounded-br-md' : 'rounded-2xl rounded-bl-md') :
                        isLastInGroup ? (isCurrentUser ? 'rounded-2xl rounded-tr-md' : 'rounded-2xl rounded-tl-md') :
                        (isCurrentUser ? 'rounded-l-2xl rounded-r-md' : 'rounded-r-2xl rounded-l-md')
                      }`}
                      style={!isCurrentUser ? {
                        borderColor: user?.color || '#666',
                        boxShadow: `0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px ${user?.color || '#666'}20`
                      } : {
                        boxShadow: '0 2px 12px rgba(59, 130, 246, 0.25)'
                      }}
                    >
                      {/* Message tail - only on last message in group */}
                      {isLastInGroup && (
                        <div 
                          className={`absolute w-3 h-3 transform rotate-45 ${
                            isCurrentUser 
                              ? 'bg-blue-500 -right-1 bottom-3' 
                              : 'bg-white -left-1 bottom-3 border-l-2 border-b-2'
                          }`}
                          style={!isCurrentUser ? {
                            borderColor: user?.color || '#666'
                          } : {}}
                        />
                      )}
                      
                      <p className="text-sm leading-relaxed break-words font-medium">
                        {message.message}
                      </p>
                    </motion.div>
                  </div>

                  {/* Avatar for current user (right side) - only show on last message in group */}
                  {isCurrentUser && (
                    <motion.div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0 transition-opacity ${
                        isLastInGroup ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ 
                        backgroundColor: user?.color || '#666',
                        border: `2px solid ${user?.color || '#666'}`,
                        boxShadow: `0 2px 12px ${user?.color || '#666'}30`
                      }}
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: isLastInGroup ? 1 : 0 }}
                      transition={{ delay: index * 0.03 + 0.1 }}
                    >
                      {message.username.charAt(0).toUpperCase()}
                    </motion.div>
                  )}
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>      {/* Input */}
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm"
      >
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <motion.input
              type="text"
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
              placeholder="Type your message..."              className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-gray-200/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              disabled={!inputMessage.trim()}
              size="sm"
              className={`px-6 py-3 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg ${
                inputMessage.trim() 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25 border-2 border-blue-500' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-200'
              }`}
              leftIcon={
                <motion.div
                  animate={{ 
                    x: inputMessage.trim() ? [0, 2, 0] : 0,
                    rotate: inputMessage.trim() ? [0, -15, 0] : 0
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: inputMessage.trim() ? Infinity : 0,
                    repeatDelay: 1
                  }}
                >
                  <Send size={16} />
                </motion.div>
              }
            >
              Send
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </div>
  )
}

export default Chat
