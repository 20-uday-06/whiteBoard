#!/bin/bash

# Collaborative Whiteboard Setup Script
echo "🎨 Setting up Collaborative Whiteboard Application..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "🚀 To start the application:"
echo "   npm run dev          # Start both servers"
echo "   npm run dev-backend  # Start only backend"
echo "   npm run dev-frontend # Start only frontend"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 Features included:"
echo "   ✅ Real-time collaborative drawing"
echo "   ✅ Multiple drawing tools (pen, shapes, text, eraser)"
echo "   ✅ Color picker and brush size controls"
echo "   ✅ Live chat functionality"
echo "   ✅ User presence indicators"
echo "   ✅ Canvas export (PNG)"
echo "   ✅ Undo/Redo and clear canvas"
echo "   ✅ Mobile-responsive design"
echo ""
echo "Happy collaborating! 🎨✨"
