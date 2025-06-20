'use client'

import { useState, useEffect } from 'react'
import { socketService } from '../utils/socket'
import { User, ChatMessage } from '../types'

export const useSocket = (roomId: string, userData: { name: string; color: string }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [socketId, setSocketId] = useState<string | null>(null)
  
  useEffect(() => {
    const socket = socketService.connect(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')

    const handleConnect = () => {
      setIsConnected(true)
      setSocketId(socket.id || null)
      socketService.emit('join-room', { roomId, userData })
    }

    const handleDisconnect = () => {
      setIsConnected(false)
    }

    const handleUserJoined = (data: { userId: string; userData: any; users: User[] }) => {
      setUsers(data.users)
    }

    const handleUserLeft = (data: { userId: string; users: User[] }) => {
      setUsers(data.users)
    }

    const handleCanvasState = (data: { canvasData: any[]; users: User[] }) => {
      setUsers(data.users)
      // The canvas restoration is handled in the Canvas component
    }

    const handleChatMessage = (message: ChatMessage) => {
      setChatMessages(prev => [...prev, message])
    }

    const handleError = (error: { message: string }) => {
      console.error('Socket error:', error.message)
    }

    // Set up event listeners
    socketService.on('connect', handleConnect)
    socketService.on('disconnect', handleDisconnect)
    socketService.on('user-joined', handleUserJoined)
    socketService.on('user-left', handleUserLeft)
    socketService.on('canvas-state', handleCanvasState)
    socketService.on('chat-message', handleChatMessage)
    socketService.on('error', handleError)

    return () => {
      socketService.off('connect', handleConnect)
      socketService.off('disconnect', handleDisconnect)
      socketService.off('user-joined', handleUserJoined)
      socketService.off('user-left', handleUserLeft)
      socketService.off('canvas-state', handleCanvasState)
      socketService.off('chat-message', handleChatMessage)
      socketService.off('error', handleError)
      socketService.disconnect()
    }
  }, [roomId, userData])

  const sendChatMessage = (message: string) => {
    if (message.trim()) {
      socketService.emit('chat-message', { message })
    }
  }
  return {
    isConnected,
    users,
    chatMessages,
    sendChatMessage,
    socket: socketService,
    socketId
  }
}
