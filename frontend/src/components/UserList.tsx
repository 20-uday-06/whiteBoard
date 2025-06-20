'use client'

import React from 'react'
import { User } from '../types'

interface UserListProps {
  users: User[]
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Online:</span>
      <div className="flex -space-x-2">
        {users.slice(0, 5).map((user) => (
          <div
            key={user.id}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-medium"
            style={{ backgroundColor: user.color }}
            title={user.name}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        ))}
        {users.length > 5 && (
          <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gray-500 flex items-center justify-center text-white text-xs font-medium">
            +{users.length - 5}
          </div>
        )}
      </div>
      <span className="text-sm text-gray-500">({users.length})</span>
    </div>
  )
}

export default UserList
