'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Users, X } from 'lucide-react'
import { useSocket } from '../hooks/useSocket'
import { FloatingToolbar } from './ui/FloatingToolbar'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import Chat from './Chat'
import UserList from './UserList'
import Canvas from './Canvas'
import { Tool } from '../types'

interface WhiteboardProps {
  roomId: string
}

const Whiteboard: React.FC<WhiteboardProps> = ({ roomId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentTool, setCurrentTool] = useState<Tool>('pen')
  const [currentColor, setCurrentColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(2)
  const [showChat, setShowChat] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  const [roomInfo, setRoomInfo] = useState<{ name: string; isPrivate: boolean } | null>(null)
  
  // Generate random user data
  const [userData] = useState(() => ({
    name: `User${Math.floor(Math.random() * 1000)}`,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
  }))

  const { isConnected, users, chatMessages, sendChatMessage, socket } = useSocket(roomId, userData)

  // Fetch room information
  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/rooms/${roomId}`)
        if (response.ok) {
          const roomData = await response.json()
          setRoomInfo({ name: roomData.name, isPrivate: roomData.isPrivate })
        }
      } catch (error) {
        console.error('Error fetching room info:', error)
      }
    }

    if (roomId) {
      fetchRoomInfo()
    }
  }, [roomId])

  const handleToolChange = useCallback((tool: Tool) => {
    setCurrentTool(tool)
  }, [])

  const handleColorChange = useCallback((color: string) => {
    setCurrentColor(color)
  }, [])

  const handleLineWidthChange = useCallback((width: number) => {
    setLineWidth(width)
  }, [])

  const handleUndo = useCallback(() => {
    socket.emit('undo')
  }, [socket])

  const handleRedo = useCallback(() => {
    socket.emit('redo')
  }, [socket])

  const handleClearCanvas = useCallback(() => {
    socket.emit('clear-canvas')
  }, [socket])
  const handleExportCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const link = document.createElement('a')
      const roomName = roomInfo?.name || 'whiteboard'
      const sanitizedRoomName = roomName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      link.download = `${sanitizedRoomName}-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }, [roomInfo])

  if (!socket) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connecting to whiteboard...</h2>
          <p className="text-gray-600">Preparing your collaborative workspace</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Floating Toolbar */}
      <FloatingToolbar
        currentTool={currentTool}
        currentColor={currentColor}
        lineWidth={lineWidth}
        onToolChange={handleToolChange}
        onColorChange={handleColorChange}
        onLineWidthChange={handleLineWidthChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClearCanvas}
        onExport={handleExportCanvas}
      />

      {/* Top Status Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4 z-40 flex items-center gap-3"
      >
        {/* Connection Status */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg px-4 py-2 flex items-center gap-2"
        >
          <motion.div
            animate={{
              scale: isConnected ? [1, 1.2, 1] : 1,
              backgroundColor: isConnected ? '#10b981' : '#ef4444'
            }}
            transition={{
              scale: { repeat: isConnected ? Infinity : 0, duration: 2 },
              backgroundColor: { duration: 0.3 }
            }}
            className="w-3 h-3 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </motion.div>        {/* Room Info */}
        <Card variant="glass" className="px-4 py-2">
          <div className="text-sm">
            <div className="font-semibold text-gray-900">
              Room: {roomInfo?.name || 'Loading...'}
            </div>
            <div className="text-gray-600">{users.length} user{users.length !== 1 ? 's' : ''} online</div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUsers(!showUsers)}
            leftIcon={<Users size={16} />}
            className="bg-white/90 backdrop-blur-lg"
          >
            {users.length}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(!showChat)}
            leftIcon={<MessageCircle size={16} />}
            className="bg-white/90 backdrop-blur-lg relative"
          >
            Chat
            {chatMessages.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {chatMessages.length > 99 ? '99+' : chatMessages.length}
              </motion.div>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Main Canvas Area */}
      <div className="absolute inset-0 pt-20">
        <Canvas
          ref={canvasRef}
          socket={socket}
          currentTool={currentTool}
          currentColor={currentColor}
          lineWidth={lineWidth}
          users={users}
        />
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-96 z-50"
          >
            <Card variant="glass" className="h-full m-4 overflow-hidden">
              <CardHeader className="flex-row items-center justify-between border-b border-white/20">
                <CardTitle className="text-lg">Chat</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                >
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <Chat
                  messages={chatMessages}
                  users={users}
                  onSendMessage={sendChatMessage}
                  onClose={() => setShowChat(false)}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Sidebar */}
      <AnimatePresence>
        {showUsers && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-80 z-50"
          >
            <Card variant="glass" className="h-full m-4 overflow-hidden">
              <CardHeader className="flex-row items-center justify-between border-b border-white/20">
                <CardTitle className="text-lg">Users Online</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUsers(false)}
                >
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                <UserList users={users} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Whiteboard
