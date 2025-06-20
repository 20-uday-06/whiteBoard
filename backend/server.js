const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Collaborative Whiteboard Backend is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

// Store room data in memory (in production, use Redis or database)
const rooms = new Map();
const userRooms = new Map();

// Room management
class Room {
  constructor(id, name, isPrivate = false, creatorId = null) {
    this.id = id;
    this.name = name;
    this.isPrivate = isPrivate;
    this.creatorId = creatorId;
    this.users = new Map();
    this.canvasData = [];
    this.createdAt = new Date();
  }

  addUser(userId, userData) {
    this.users.set(userId, {
      ...userData,
      joinedAt: new Date()
    });
  }

  removeUser(userId) {
    this.users.delete(userId);
  }
  addCanvasElement(element) {
    this.canvasData.push({
      ...element,
      id: uuidv4(),
      timestamp: new Date()
    });
  }

  getCanvasData() {
    return this.canvasData.map(element => ({
      ...element,
      username: this.users.get(element.userId)?.name || 'Unknown User'
    }));
  }

  clearCanvas() {
    this.canvasData = [];
  }

  undoLastAction(userId) {
    // Find and remove the last action by this user
    for (let i = this.canvasData.length - 1; i >= 0; i--) {
      if (this.canvasData[i].userId === userId) {
        const removedElement = this.canvasData.splice(i, 1)[0];
        return removedElement;
      }
    }
    return null;
  }
}

// REST API Routes
app.get('/api/rooms', (req, res) => {
  const publicRooms = Array.from(rooms.values())
    .filter(room => !room.isPrivate)
    .map(room => ({
      id: room.id,
      name: room.name,
      userCount: room.users.size,
      createdAt: room.createdAt
    }));
  
  res.json(publicRooms);
});

app.post('/api/rooms', (req, res) => {
  const { name, isPrivate = false, creatorId } = req.body;
  const roomId = uuidv4();
  const room = new Room(roomId, name, isPrivate, creatorId);
  rooms.set(roomId, room);
  
  res.json({
    id: roomId,
    name: room.name,
    isPrivate: room.isPrivate,
    joinUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/room/${roomId}`
  });
});

app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
    res.json({
    id: room.id,
    name: room.name,
    isPrivate: room.isPrivate,
    userCount: room.users.size,
    canvasData: room.getCanvasData()
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join room
  socket.on('join-room', (data) => {
    const { roomId, userData } = data;
    const room = rooms.get(roomId);
    
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }

    // Leave previous room if any
    const previousRoomId = userRooms.get(socket.id);
    if (previousRoomId) {
      socket.leave(previousRoomId);
      const previousRoom = rooms.get(previousRoomId);
      if (previousRoom) {
        previousRoom.removeUser(socket.id);        socket.to(previousRoomId).emit('user-left', {
          userId: socket.id,
          users: Array.from(previousRoom.users.entries()).map(([id, userData]) => ({
            id,
            ...userData
          }))
        });
      }
    }

    // Join new room
    socket.join(roomId);
    room.addUser(socket.id, userData);
    userRooms.set(socket.id, roomId);    // Send current canvas state to the new user
    socket.emit('canvas-state', {
      canvasData: room.getCanvasData(),
      users: Array.from(room.users.entries()).map(([id, userData]) => ({
        id,
        ...userData
      }))
    });

    // Notify others in the room
    socket.to(roomId).emit('user-joined', {
      userId: socket.id,
      userData,
      users: Array.from(room.users.entries()).map(([id, userData]) => ({
        id,
        ...userData
      }))
    });

    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Handle drawing events
  socket.on('draw-start', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      socket.to(roomId).emit('draw-start', { ...data, userId: socket.id });
    }
  });

  socket.on('drawing', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      socket.to(roomId).emit('drawing', { ...data, userId: socket.id });
    }
  });

  socket.on('draw-end', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        room.addCanvasElement({ ...data, userId: socket.id });
      }
      socket.to(roomId).emit('draw-end', { ...data, userId: socket.id });
    }
  });

  // Handle shape creation
  socket.on('shape-created', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        room.addCanvasElement({ ...data, userId: socket.id });
      }
      socket.to(roomId).emit('shape-created', { ...data, userId: socket.id });
    }
  });

  // Handle text creation
  socket.on('text-created', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        room.addCanvasElement({ ...data, userId: socket.id });
      }
      socket.to(roomId).emit('text-created', { ...data, userId: socket.id });
    }
  });

  // Handle eraser
  socket.on('erase', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      socket.to(roomId).emit('erase', { ...data, userId: socket.id });
    }
  });

  // Handle undo
  socket.on('undo', () => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        const undoneElement = room.undoLastAction(socket.id);
        if (undoneElement) {
          io.to(roomId).emit('element-removed', { elementId: undoneElement.id });
        }
      }
    }
  });

  // Handle clear canvas
  socket.on('clear-canvas', () => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        room.clearCanvas();
        io.to(roomId).emit('canvas-cleared');
      }
    }
  });

  // Handle cursor movement
  socket.on('cursor-move', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      socket.to(roomId).emit('cursor-move', { ...data, userId: socket.id });
    }
  });

  // Handle chat messages
  socket.on('chat-message', (data) => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      const user = room?.users.get(socket.id);
      if (user) {
        const messageData = {
          id: uuidv4(),
          userId: socket.id,
          username: user.name,
          message: data.message,
          timestamp: new Date()
        };
        io.to(roomId).emit('chat-message', messageData);
      }
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        room.removeUser(socket.id);        socket.to(roomId).emit('user-left', {
          userId: socket.id,
          users: Array.from(room.users.entries()).map(([id, userData]) => ({
            id,
            ...userData
          }))
        });
        
        // Clean up empty rooms
        if (room.users.size === 0) {
          rooms.delete(roomId);
        }
      }
      userRooms.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
