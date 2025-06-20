# Collaborative Whiteboard

A real-time collaborative whiteboard web application that enables multiple users to draw, write, and interact simultaneously.

![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![React](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## Live Demo

**[Try the Live Application](https://whiteboard-ten-blush.vercel.app)**

## Features

### Drawing Tools
- Freehand pen with customizable colors and brush sizes
- Shape tools (rectangles, circles)
- Text tool with custom styling
- Eraser tool
- Full spectrum color picker

### Real-Time Collaboration
- WebSocket integration powered by Socket.io
- Live cursor tracking
- Instant synchronization across all users
- Multi-user sessions

### Canvas Management
- Undo/Redo functionality
- Clear canvas (affects all users)
- Auto-save with state preservation
- Responsive design for all devices

### Communication
- Built-in real-time chat
- User presence indicators
- Color-coded user identification

### Export & Sharing
- PNG export with white background
- Shareable room URLs
- Public and private rooms

## Tech Stack

**Frontend (Vercel)**
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- HTML5 Canvas
- Socket.io Client
- React Colorful

**Backend (Render)**
- Node.js
- Express.js
- Socket.io
- MongoDB
- CORS

**Development & Deployment**
- ESLint
- Vercel (Frontend hosting)
- Render (Backend hosting)
- Git

## Local Development

### Prerequisites
- Node.js v18+
- npm or yarn
- Git

### Setup
```bash
git clone https://github.com/20-uday-06/whiteBoard.git
cd whiteBoard
```

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/collaborative-whiteboard
NODE_ENV=development
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Deployment

### Quick Deploy
Use the automated scripts:
```bash
./deploy-vercel.sh    # Linux/Mac
deploy-vercel.bat     # Windows
```

### Manual Deployment

**Vercel (Frontend)**
1. Go to vercel.com
2. Import repository: `20-uday-06/whiteBoard`
3. Set Root Directory: `frontend`
4. Add environment variable: `NEXT_PUBLIC_BACKEND_URL`
5. Deploy

**Render (Backend)**
1. Create Web Service on render.com
2. Connect GitHub repository
3. Set build/start commands
4. Add environment variables
5. Deploy

### Production Environment Variables
```env
# Backend (Render)
FRONTEND_URL=https://whiteboard-ten-blush.vercel.app
MONGODB_URI=mongodb+srv://...
NODE_ENV=production

# Frontend (Vercel)
NEXT_PUBLIC_BACKEND_URL=https://whiteboard-collaboration-backend.onrender.com
```

## Usage

### Live Application
1. Visit: https://whiteboard-ten-blush.vercel.app
2. Create a new room or join an existing one
3. Share the room URL with collaborators
4. Start drawing and see real-time updates

### Local Development
1. Start both backend (port 5000) and frontend (port 3000)
2. Create a room and share the URL
3. Test with multiple browser tabs

### Features
- Select drawing tools and colors from the toolbar
- Use shape tools for rectangles and circles
- Add text by clicking the text tool
- Chat with collaborators using the sidebar
- Export your work as PNG
- Undo/redo actions as needed

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
