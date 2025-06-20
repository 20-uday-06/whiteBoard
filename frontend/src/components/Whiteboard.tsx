'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useSocket } from '../hooks/useSocket'
import Toolbar from './Toolbar'
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
  
  // Generate random user data
  const [userData] = useState(() => ({
    name: `User${Math.floor(Math.random() * 1000)}`,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
  }))

  const { isConnected, users, chatMessages, sendChatMessage, socket } = useSocket(roomId, userData)

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

  const handleClearCanvas = useCallback(() => {
    socket.emit('clear-canvas')
  }, [socket])

  const handleExportCanvas = useCallback(() => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = `whiteboard-${roomId}-${Date.now()}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }, [roomId])

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to room...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Room: {roomId}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <UserList users={users} />
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chat ({chatMessages.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Toolbar */}
        <div className="bg-white border-r border-gray-200 p-4">
          <Toolbar
            currentTool={currentTool}
            currentColor={currentColor}
            lineWidth={lineWidth}
            onToolChange={handleToolChange}
            onColorChange={handleColorChange}
            onLineWidthChange={handleLineWidthChange}
            onUndo={handleUndo}
            onClearCanvas={handleClearCanvas}
            onExportCanvas={handleExportCanvas}
          />
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
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
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200">
            <Chat
              messages={chatMessages}
              users={users}
              onSendMessage={sendChatMessage}
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Whiteboard
