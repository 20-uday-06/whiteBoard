# Collaborative Whiteboard

A real-time collaborative whiteboard web application that enables multiple users to draw, write, and interact simultaneously.

![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![React](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## Live Demo

**[Try the Live Application](https://whiteboard-ten-blush.vercel.app)**

## Local Development

### Prerequisites

- **Node.js** v18+ installed on your system
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/20-uday-06/whiteBoard.git
cd whiteBoard/collaborative-whiteboard
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/collaborative-whiteboard
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

#### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create environment file:
```bash
cp .env.example .env.local
```

Configure your `.env.local` file:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

Application will be available at `http://localhost:3000`

### Development Scripts

#### Backend Commands
```bash
npm start
npm run dev
npm run test
```

#### Frontend Commands
```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
```

### Testing Your Setup

1. Open `http://localhost:3000`
2. Click **Create New Room**
3. Enter your name and room name
4. Start drawing
5. Open another browser tab with the same room URL to test real-time collaboration

### Development Tips

#### Hot Reload
- Frontend: Automatic reload on file changes
- Backend: Use `npm run dev` for automatic restart with nodemon

#### Debugging
- Frontend: Open browser DevTools <kbd>F12</kbd>
- Backend: Check terminal logs
- Network: Monitor WebSocket connections in DevTools

#### Keyboard Shortcuts
- <kbd>Ctrl + Z</kbd> / <kbd>Cmd + Z</kbd> - Undo
- <kbd>Ctrl + Y</kbd> / <kbd>Cmd + Y</kbd> - Redo
- <kbd>Delete</kbd> - Clear canvas
- <kbd>Ctrl + S</kbd> / <kbd>Cmd + S</kbd> - Export canvas

### Database Setup (Optional)

For local development, you can use MongoDB locally or MongoDB Atlas:

#### Local MongoDB
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongo mongodb/mongodb-community-server
```

#### MongoDB Atlas
1. Create account at [mongodb.com](https://mongodb.com)
2. Create new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Environment Variables Reference

#### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/collaborative-whiteboard` |
| `NODE_ENV` | Environment mode | `development` |

#### Frontend (.env.local)
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL | `http://localhost:5000` |

### Troubleshooting

#### Common Issues

**CORS Errors**
- Ensure `FRONTEND_URL` in backend matches your frontend URL
- Check both servers are running

**Socket Connection Failed**
- Verify `NEXT_PUBLIC_BACKEND_URL` points to running backend
- Check firewall settings

**Build Failures**
- Run `npm run type-check` to identify TypeScript errors
- Ensure all dependencies are installed

**MongoDB Connection Issues**
- Verify MongoDB is running
- Check connection string format
- Ensure network access for Atlas

## Project Structure

```
collaborative-whiteboard/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   └── room/[roomId]/
│   │   │       └── page.tsx
│   │   ├── components/
│   │   │   ├── Whiteboard.tsx
│   │   │   ├── Canvas.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── UserList.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       └── Card.tsx
│   │   ├── hooks/
│   │   │   └── useSocket.ts
│   │   ├── utils/
│   │   │   └── socket.ts
│   │   └── types/
│   │       └── index.ts
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.local
│   └── .env.example
└── README.md
```

---



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

### Frontend (Vercel)
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **HTML5 Canvas** for drawing
- **Socket.io Client** for real-time communication
- **React Colorful** for color picker

### Backend (Render)
- **Node.js** runtime
- **Express.js** web framework
- **Socket.io** for WebSocket connections
- **MongoDB** for data persistence
- **CORS** for cross-origin requests

### Development & Deployment
- **ESLint** for code linting
- **TypeScript** for type checking
- **Vercel** for frontend hosting
- **Render** for backend hosting
- **Git** for version control

## Production Deployment

### Frontend Deployment (Vercel)

#### Method 1: Vercel Website
1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project**
3. Connect GitHub and select repository
4. Set **Root Directory** to `frontend`
5. Add environment variable:
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend URL
6. Click **Deploy**

#### Method 2: Vercel CLI
```bash
npm i -g vercel
cd frontend
vercel --prod
```

### Backend Deployment (Render)

1. Create account at [render.com](https://render.com)
2. Click **New Web Service**
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add environment variables:
   - `FRONTEND_URL`: Your Vercel frontend URL
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
6. Click **Deploy**

### Production Environment Variables

#### Vercel (Frontend)
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

#### Render (Backend)
```env
FRONTEND_URL=https://your-app.vercel.app
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
NODE_ENV=production
PORT=auto-assigned
```

## Usage Guide

### Creating a Room
1. Visit the application
2. Click **Create New Room**
3. Enter your name and room name
4. Choose public or private room
5. Click **Create Room**
6. Share the room URL with collaborators

### Drawing Tools
- **Pen Tool**: Freehand drawing
- **Rectangle**: Click and drag to create rectangles
- **Circle**: Click and drag to create circles
- **Text**: Click to add text at cursor position
- **Eraser**: Remove drawings by dragging over them

### Collaboration Features
- **Chat**: Click chat icon to open messaging
- **Users**: Click users icon to see online participants
- **Export**: Click download to save canvas as PNG
- **Clear**: Remove all drawings (affects all users)

## API Reference

### REST Endpoints

```http
GET /api/rooms
```
Get list of public rooms

```http
POST /api/rooms
```
Create a new room

```http
GET /api/rooms/:roomId
```
Get room details by ID

### Socket Events

#### Client to Server
- `join-room` - Join a specific room
- `draw-start` - Start drawing stroke
- `drawing` - Drawing data
- `draw-end` - End drawing stroke
- `chat-message` - Send chat message
- `clear-canvas` - Clear the canvas

#### Server to Client
- `canvas-state` - Initial canvas state
- `user-joined` - User joined room
- `user-left` - User left room
- `draw-start` - User started drawing
- `drawing` - Drawing data from user
- `draw-end` - User finished drawing
- `chat-message` - Chat message received
- `canvas-cleared` - Canvas was cleared

## Contributing

### Development Guidelines
- Follow TypeScript best practices
- Add proper error handling
- Test on multiple browsers
- Update documentation as needed
- Follow existing code style

### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Create a feature branch
4. Make your changes
5. Test thoroughly
6. Submit a pull request

### Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Uday Tyagi**
- GitHub: [@20-uday-06](https://github.com/20-uday-06)
- Repository: [whiteBoard](https://github.com/20-uday-06/whiteBoard)

## Acknowledgments

- [Socket.io](https://socket.io/) - Real-time communication
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vercel](https://vercel.com/) - Frontend deployment
- [Render](https://render.com/) - Backend deployment

---

**Built for the developer community**
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
