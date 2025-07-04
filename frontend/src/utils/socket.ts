import { io, Socket } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null
  private listeners: Map<string, ((...args: any[]) => void)[]> = new Map()
  connect(url: string) {
    if (this.socket?.connected) {
      return this.socket
    }

    console.log('Connecting to:', url)
    this.socket = io(url, {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 5000
    })
    

    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach(callback => {
        this.socket?.on(event, callback)
      })
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  emit(event: string, data?: any) {
    this.socket?.emit(event, data)
  }
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)?.push(callback)
    
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (callback) {
      const callbacks = this.listeners.get(event) || []
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
      this.socket?.off(event, callback)
    } else {
      this.listeners.delete(event)
      this.socket?.off(event)
    }
  }

  isConnected() {
    return this.socket?.connected || false
  }
}

export const socketService = new SocketService()
