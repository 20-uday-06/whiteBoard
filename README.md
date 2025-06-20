# 🎨 Collaborative Whiteboard

A real-time collaborative whiteboard web application that enables multiple users to draw, write, and interact simultaneously—replicating the experience of a physical whiteboard in the browser.

![Collaborative Whiteboard Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![React](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## 🔗 Live Demo

🚀 **[Try the Live Demo](https://your-deployment-url.vercel.app)**

## 📌 Project Overview

This application provides a seamless collaborative drawing experience where multiple users can:
- Draw and sketch in real-time
- Create shapes and add text
- Chat while collaborating
- See live cursors of other users
- Export their work as images

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
- **Undo/Redo** - Step-by-step action reversal
- **Clear Canvas** - Reset the entire workspace
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### 💾 Export Options
- **PNG Export** - Download whiteboard as high-quality images
- **Real-time Backup** - Canvas state automatically preserved

### 💬 Communication Features
- **Built-in Chat** - Real-time messaging sidebar
- **User Identification** - Color-coded user avatars and names

## 🔧 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - High-performance drawing surface
- **Socket.io Client** - Real-time communication
- **React Colorful** - Advanced color picker component

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional event-based communication
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/collaborative-whiteboard.git
cd collaborative-whiteboard
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend application will start on `http://localhost:3000`

### 4. Environment Configuration

#### Backend (.env)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## 🎮 Usage

1. **Start the Application**
   - Ensure both backend and frontend servers are running
   - Open `http://localhost:3000` in your browser

2. **Create or Join a Room**
   - Click "Create New Room" to start a new session
   - Share the room URL with collaborators
   - Or try the "Demo Room" for immediate access

3. **Start Collaborating**
   - Select drawing tools from the left sidebar
   - Choose colors and brush sizes
   - Draw, create shapes, or add text
   - Use the chat feature to communicate

4. **Export Your Work**
   - Click "Export PNG" to download the current canvas
   - All changes are automatically saved during the session

## 📁 Project Structure

```
collaborative-whiteboard/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   └── room/[roomId]/page.tsx
│   │   ├── components/   # React components
│   │   │   ├── Whiteboard.tsx
│   │   │   ├── Canvas.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── Chat.tsx
│   │   │   └── UserList.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   │   └── useSocket.ts
│   │   ├── utils/        # Utility functions
│   │   │   └── socket.ts
│   │   └── types/        # TypeScript type definitions
│   │       └── index.ts
│   ├── package.json      # Frontend dependencies
│   ├── next.config.js    # Next.js configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── tsconfig.json     # TypeScript configuration
└── README.md
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

## 🔮 Future Enhancements

- [ ] **Voice Chat Integration** - WebRTC-based voice communication
- [ ] **User Authentication** - Account creation and login system
- [ ] **Canvas Templates** - Pre-designed templates for different use cases
- [ ] **Layer Management** - Multiple drawing layers with visibility controls
- [ ] **Advanced Shapes** - Lines, arrows, polygons, and custom shapes
- [ ] **Image Import** - Upload and integrate images into the canvas
- [ ] **Version History** - Save and restore previous canvas states
- [ ] **Mobile App** - Native mobile applications for iOS and Android
- [ ] **Whiteboard Sharing** - Public gallery of shared whiteboards
- [ ] **Real-time Video** - Video conferencing integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Demo

🔗 **Live Demo**: [https://your-app-domain.vercel.app](https://your-app-domain.vercel.app)

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [React Colorful](https://github.com/omgovich/react-colorful) for the color picker component

---

⭐ If you found this project helpful, please give it a star on GitHub!
