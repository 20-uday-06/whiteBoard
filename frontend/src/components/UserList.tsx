'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from '../types'

interface UserListProps {
  users: User[]
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-4">
        {users.length} user{users.length !== 1 ? 's' : ''} online
      </div>
      
      <AnimatePresence>
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 group hover:bg-white/70 transition-all"
          >
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium shadow-lg"
              style={{ backgroundColor: user.color }}
              whileHover={{ scale: 1.1 }}
              animate={{ 
                boxShadow: [
                  `0 0 0 0 ${user.color}40`,
                  `0 0 0 10px ${user.color}00`,
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">
                Active now
              </div>
            </div>
            
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {users.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 text-sm py-8"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <div className="w-6 h-6 rounded-full bg-gray-300" />
          </div>
          <p>No users online</p>
          <p>Waiting for collaborators...</p>
        </motion.div>
      )}
    </div>
  )
}

export default UserList
