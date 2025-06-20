# 🎨 Collaborative Whiteboard

A real-time collaborative whiteboard web application that enables multiple users to draw, write, and interact simultaneously—replicating the experience of a physical whiteboard in the browser.

![Collaborative Whiteboard Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![React](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue) ![Deployed](https://img.shields.io/badge/Deployed-Vercel%20%2B%20Render-blue)

## 🔗 Live Demo

🚀 **[Try the Live Application](https://whiteboard-ten-blush.vercel.app)**

## 📌 Project Overview

This application provides a seamless collaborative drawing experience where multiple users can:
- ✅ Draw and sketch in real-time across multiple devices
- ✅ Create shapes (rectangles, circles) and add text
- ✅ Chat while collaborating with built-in messaging
- ✅ See live cursors and user presence indicators
- ✅ Export their work as high-quality PNG images
- ✅ Create public or private rooms for different groups

## ✨ Features

### 🖊️ Drawing Tools
- **Freehand Pen Tool** - Smooth drawing with customizable colors and brush sizes
- **Shape Tools** - Rectangle and Circle creation
- **Text Tool** - Add text with customizable styling
- **Eraser Tool** - Remove content selectively
- **Color Picker** - Full spectrum color selection with hex support

### 🚀 Real-Time Collaboration
- **WebSocket Integration** - Powered by Socket.io for instant updates
- **Live Cursor Tracking** - See where other users are working
- **Instant Synchronization** - All changes reflect immediately across all connected users
- **Multi-User Sessions** - Support for unlimited concurrent users

### 👥 Session Management
- **Room Creation** - Create public or private rooms
- **Shareable Links** - Easy room access via URLs
- **User Presence** - See who's currently online
- **Room Persistence** - Canvas state maintained during sessions

### 🎛️ Canvas Management
- **Undo/Redo** - Step-by-step action reversal with history tracking
- **Clear Canvas** - Reset the entire workspace for all users
- **Auto-Save** - Canvas state automatically preserved and synchronized
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **High Performance** - Smooth drawing even with multiple concurrent users

### 💾 Export & Sharing
- **PNG Export** - Download whiteboard as high-quality images with white background
- **Room Sharing** - Share room URLs for easy collaboration
- **Real-time Backup** - Canvas state maintained across sessions
- **Cross-Platform** - Works seamlessly across all modern browsers

### 💬 Communication Features
- **Built-in Chat** - Real-time messaging sidebar
- **User Identification** - Color-coded user avatars and names

## 🔧 Tech Stack

### Frontend (Deployed on Vercel)
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **HTML5 Canvas** - High-performance drawing surface
- **Socket.io Client** - Real-time communication
- **React Colorful** - Advanced color picker component

### Backend (Deployed on Render)
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional event-based communication
- **MongoDB** - Database for room and canvas persistence
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing

### Development & Deployment
- **ESLint** - Code linting and formatting
- **Vercel** - Frontend deployment and hosting
- **Render** - Backend deployment and hosting
- **Git** - Version control with automated deployment

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/20-uday-06/whiteBoard.git
cd whiteBoard
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

npm start
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration

npm run dev
```

The frontend application will start on `http://localhost:3000`

### 4. Environment Configuration

#### Backend (.env)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/collaborative-whiteboard
NODE_ENV=development
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## 🚀 Production Deployment

### Quick Deploy (Recommended)

Use our automated deployment scripts:

```bash
# Run deployment script
./deploy-vercel.sh    # Linux/Mac
deploy-vercel.bat     # Windows
```

The script will:
- ✅ Commit and push changes to Git
- ✅ Test production build
- ✅ Provide deployment instructions

### Manual Deployment

#### Frontend Deployment (Vercel)
1. **Website Method (Easiest)**:
   - Go to [vercel.com](https://vercel.com)
   - Import repository: `20-uday-06/whiteBoard`
   - Set **Root Directory**: `frontend`
   - Add environment variable:
     - `NEXT_PUBLIC_BACKEND_URL`: `https://whiteboard-collaboration-backend.onrender.com`
   - Deploy!

2. **CLI Method**:
   ```bash
   cd frontend
   npm install -g vercel
   vercel login
   vercel --prod
   ```

#### Backend Deployment (Render)
1. Create new Web Service on [render.com](https://render.com)
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `FRONTEND_URL`: Your Vercel domain
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`

### Environment Variables for Production
```env
# Backend (Render)
PORT=5000
FRONTEND_URL=https://whiteboard-ten-blush.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whiteboard
NODE_ENV=production

# Frontend (Vercel)
NEXT_PUBLIC_BACKEND_URL=https://whiteboard-collaboration-backend.onrender.com
```

## 🎮 How to Use

### 🌐 **Live Application**
1. **Visit**: [https://whiteboard-ten-blush.vercel.app](https://whiteboard-ten-blush.vercel.app)
2. **Create Room**: Click "Create New Room" and enter your details
3. **Share**: Copy the room URL and share with collaborators
4. **Collaborate**: Start drawing and see real-time updates!

### 💻 **Local Development**
1. **Start Servers**: Ensure both backend (port 5000) and frontend (port 3000) are running
2. **Create Room**: Click "Create New Room" to start a new session
3. **Invite Others**: Share the room URL with collaborators
4. **Demo Room**: Try the "Demo Room" for immediate testing

### 🎨 **Using the Whiteboard**
- **Drawing**: Select pen tool, choose color and size, start drawing
- **Shapes**: Use rectangle/circle tools for precise shapes
- **Text**: Click text tool and click canvas to add text
- **Eraser**: Remove content selectively
- **Undo/Redo**: Use toolbar buttons or keyboard shortcuts
- **Chat**: Open chat sidebar to communicate with team
- **Export**: Download your work as PNG image

### 🔧 **Pro Tips**
- Use different colors to identify your contributions
- Clear canvas affects all users - use with caution
- Chat messages are visible to all room participants
- Canvas state is preserved during sessions
- Works best on desktop browsers for full feature access

## 📁 Project Structure

```
collaborative-whiteboard/
├── 📁 backend/                    # Node.js + Express + Socket.io
│   ├── server.js                  # Main server with API routes
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables
│   └── .env.example              # Environment template
├── 📁 frontend/                  # Next.js + TypeScript + Tailwind
│   ├── 📁 src/
│   │   ├── 📁 app/               # Next.js App Router
│   │   │   ├── layout.tsx        # Root layout
│   │   │   ├── page.tsx          # Home page with room selection
│   │   │   ├── globals.css       # Global styles
│   │   │   └── 📁 room/[roomId]/ # Dynamic room pages
│   │   │       └── page.tsx      # Whiteboard room interface
│   │   ├── 📁 components/        # Reusable React components
│   │   │   ├── Whiteboard.tsx    # Main whiteboard container
│   │   │   ├── Canvas.tsx        # Drawing canvas logic
│   │   │   ├── Toolbar.tsx       # Drawing tools
│   │   │   ├── Chat.tsx          # Real-time chat
│   │   │   ├── UserList.tsx      # Online users display
│   │   │   └── 📁 ui/            # UI components
│   │   │       ├── Button.tsx    # Custom button component
│   │   │       └── Card.tsx      # Card UI component
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   │   └── useSocket.ts      # Socket.io integration
│   │   ├── 📁 utils/             # Utility functions
│   │   │   └── socket.ts         # Socket service class
│   │   └── 📁 types/             # TypeScript definitions
│   │       └── index.ts          # Type definitions
│   ├── package.json              # Frontend dependencies
│   ├── next.config.js            # Next.js configuration
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── tsconfig.json             # TypeScript config
│   ├── .env.local                # Local environment variables
│   ├── .env.production           # Production environment variables
│   └── .env.example              # Environment template
├── 📁 deployment/                # Deployment scripts and guides
│   ├── deploy-vercel.sh          # Linux/Mac deployment script
│   ├── deploy-vercel.bat         # Windows deployment script
│   ├── DEPLOYMENT_VERCEL.md      # Deployment guide
│   └── VERCEL_WEB_DEPLOY.md      # Web deployment guide
└── README.md                     # This file
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend URL
3. Deploy automatically on commits

### Backend Deployment (Render/Heroku)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables:
   - `PORT`: Provided by the platform
   - `FRONTEND_URL`: Your frontend URL
4. Deploy with automatic builds

### Environment Variables for Production
```env
# Backend
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production

# Frontend
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.render.com
```

## 🐛 Troubleshooting

### Common Issues

#### ❌ "Create Room" button not working
- **Cause**: CORS issue - backend not allowing frontend domain
- **Solution**: Update `FRONTEND_URL` in Render backend environment variables

#### ❌ Socket connection shows "Disconnected"
- **Cause**: Backend URL incorrect or backend server down
- **Solution**: Check `NEXT_PUBLIC_BACKEND_URL` in Vercel environment variables

#### ❌ Drawing not syncing between users
- **Cause**: Socket connection issues or room not properly joined
- **Solution**: Refresh page, check browser console for errors

#### ❌ Build fails on Vercel
- **Cause**: TypeScript errors or missing dependencies
- **Solution**: Run `npm run build` locally to check for errors

### Environment Variables Checklist

#### ✅ **Vercel (Frontend)**
- `NEXT_PUBLIC_BACKEND_URL` = `https://whiteboard-collaboration-backend.onrender.com`

#### ✅ **Render (Backend)**
- `FRONTEND_URL` = `https://whiteboard-ten-blush.vercel.app`
- `MONGODB_URI` = Your MongoDB connection string
- `NODE_ENV` = `production`
- `PORT` = Auto-assigned by Render

## 🔮 Future Enhancements

- [ ] **User Authentication** - Account creation and persistent rooms
- [ ] **Canvas Templates** - Pre-designed templates for brainstorming, planning
- [ ] **Layer Management** - Multiple drawing layers with visibility controls
- [ ] **Advanced Shapes** - Lines, arrows, polygons, flowchart elements
- [ ] **Image Import** - Upload and integrate images into the canvas
- [ ] **Version History** - Save and restore previous canvas states
- [ ] **Voice Chat** - WebRTC-based voice communication
- [ ] **Mobile App** - Native mobile applications for iOS and Android
- [ ] **Collaborative Cursors** - Enhanced real-time cursor tracking
- [ ] **Drawing Analytics** - Track user contributions and activity

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes and test thoroughly
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request with detailed description

### Development Guidelines
- Follow TypeScript best practices
- Add proper error handling
- Test on multiple browsers
- Update documentation as needed
- Follow existing code style

## 📊 Project Stats

- **Live Demo**: [whiteboard-ten-blush.vercel.app](https://whiteboard-ten-blush.vercel.app)
- **Repository**: [20-uday-06/whiteBoard](https://github.com/20-uday-06/whiteBoard)
- **Backend**: Deployed on Render.com
- **Frontend**: Deployed on Vercel.com
- **Database**: MongoDB Atlas
- **Real-time**: Socket.io WebSocket connections

## 👨‍💻 Author

**Uday Tyagi**
- GitHub: [@20-uday-06](https://github.com/20-uday-06)
- Repository: [whiteBoard](https://github.com/20-uday-06/whiteBoard)

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) - Real-time bidirectional event-based communication
- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Colorful](https://github.com/omgovich/react-colorful) - Color picker component
- [Vercel](https://vercel.com/) - Frontend deployment platform
- [Render](https://render.com/) - Backend deployment platform

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own projects!

---

### 🌟 **Star this repository if you found it helpful!**

**Built with ❤️ for the developer community**
