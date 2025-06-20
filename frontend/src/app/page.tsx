'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Users, 
  MessageCircle, 
  Zap, 
  ArrowRight, 
  Plus, 
  X,
  Lock,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Home() {
  const [rooms, setRooms] = useState([])
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [showJoinRoom, setShowJoinRoom] = useState(false)
  const [showRoomCreated, setShowRoomCreated] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const [createdRoom, setCreatedRoom] = useState<any>(null)
  const [isPrivate, setIsPrivate] = useState(false)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/rooms`)
      const data = await response.json()
      setRooms(data)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    }
  }

  const createRoom = async () => {
    if (!roomName.trim() || !userName.trim()) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: roomName,
          isPrivate,
          creatorId: 'user-' + Date.now()
        }),
      })
      
      const room = await response.json()
      setCreatedRoom(room)
      setShowCreateRoom(false)
      setShowRoomCreated(true)
    } catch (error) {
      console.error('Error creating room:', error)
    }
  }

  const joinCreatedRoom = () => {
    if (createdRoom) {
      window.location.href = `/room/${createdRoom.id}?username=${encodeURIComponent(userName)}`
    }
  }

  const joinRoom = (roomId: string) => {
    if (!userName.trim()) {
      setSelectedRoomId(roomId)
      setShowJoinRoom(true)
      return
    }
    window.location.href = `/room/${roomId}?username=${encodeURIComponent(userName)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
          >
            Collaborative
            <br />
            <span className="text-5xl md:text-6xl">Whiteboard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Create, collaborate, and visualize your ideas in real-time with your team. 
            Draw, write, and share seamlessly across devices with beautiful animations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              onClick={() => setShowCreateRoom(true)}
              leftIcon={<Plus size={20} />}
              className="text-lg px-8 py-4"
            >
              Create New Room
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowJoinRoom(true)}
              rightIcon={<Users size={20} />}
              className="text-lg px-8 py-4"
            >
              Join Room
            </Button>
          </motion.div>
        </motion.div>

        {/* Create Room Modal */}
        {showCreateRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateRoom(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create New Room</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCreateRoom(false)}
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter room name..."
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    id="private-room"
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="private-room" className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    {isPrivate ? <Lock size={16} /> : <Globe size={16} />}
                    {isPrivate ? 'Private Room' : 'Public Room'}
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={createRoom}
                  disabled={!roomName.trim() || !userName.trim()}
                  className="flex-1"
                >
                  Create Room
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setShowCreateRoom(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Join Room Modal */}
        {showJoinRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowJoinRoom(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Join a Room</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowJoinRoom(false)}
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Key (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter room key to join specific room..."
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Button
                      onClick={() => {
                        if (!userName.trim() || !selectedRoomId.trim()) return
                        window.location.href = `/room/${selectedRoomId}?username=${encodeURIComponent(userName)}`
                      }}
                      disabled={!userName.trim() || !selectedRoomId.trim()}
                    >
                      Join
                    </Button>
                  </div>
                </div>
                
                {rooms.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Public Rooms
                    </label>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {rooms.map((room: any) => (
                        <div
                          key={room.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{room.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <Users size={12} />
                              {room.userCount || 0} users online
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              if (!userName.trim()) return
                              window.location.href = `/room/${room.id}?username=${encodeURIComponent(userName)}`
                            }}
                            disabled={!userName.trim()}
                          >
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {rooms.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users size={32} className="mx-auto mb-3 opacity-50" />
                    <p>No public rooms available</p>
                    <p className="text-sm">Create a new room to get started!</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="secondary"
                  onClick={() => setShowJoinRoom(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Room Created Modal */}
        {showRoomCreated && createdRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRoomCreated(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Room Created!</h3>
                <p className="text-gray-600 mb-6">Your room "{createdRoom.name}" has been created successfully.</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Key (Share this with others)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={createdRoom.id}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(createdRoom.id)
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={joinCreatedRoom}
                  className="flex-1"
                >
                  Join Room
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => {
                    setShowRoomCreated(false)
                    setCreatedRoom(null)
                    setRoomName('')
                    setUserName('')
                  }}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Everything you need to collaborate
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Palette,
                title: 'Drawing Tools',
                description: 'Professional drawing tools with customizable brushes, shapes, and colors',
                color: 'from-blue-500 to-purple-600'
              },
              {
                icon: Users,
                title: 'Real-time Collaboration',
                description: 'See changes instantly as your team works together in real-time',
                color: 'from-green-500 to-teal-600'
              },
              {
                icon: MessageCircle,
                title: 'Built-in Chat',
                description: 'Communicate seamlessly with integrated chat and voice notes',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized for speed with smooth animations and instant responses',
                color: 'from-orange-500 to-red-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <Card variant="elevated" className="h-full text-center group">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <feature.icon size={28} className="text-white" />
                    </motion.div>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rooms Section */}
        {rooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Card variant="glass" className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl">Active Rooms</CardTitle>
                <CardDescription className="text-lg">
                  Quick access to join existing collaboration sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map((room: any, index) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                    >
                      <Card 
                        variant="gradient" 
                        className="group border-2 border-transparent hover:border-blue-200"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="truncate">{room.name}</span>
                            {room.isPrivate && <Lock size={16} className="text-gray-500" />}
                          </CardTitle>
                          <CardDescription>
                            <div className="flex items-center gap-2">
                              <Users size={14} />
                              <span>{room.userCount || 0} users online</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Created {new Date(room.createdAt).toLocaleDateString()}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => joinRoom(room.id)}
                              rightIcon={<ArrowRight size={16} />}
                            >
                              Join
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
