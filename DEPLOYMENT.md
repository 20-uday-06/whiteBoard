# Deployment Guide

## Quick Deploy to Vercel (Frontend) and Render (Backend)

### 1. Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set Root Directory to `frontend`
   - Add environment variable:
     - `NEXT_PUBLIC_BACKEND_URL`: `https://your-backend-url.render.com`
   - Deploy!

### 2. Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Connect your GitHub account

2. **Create New Web Service**
   - Select your repository
   - Set:
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add environment variables:
     - `FRONTEND_URL`: `https://your-frontend-url.vercel.app`
     - `NODE_ENV`: `production`

### 3. Alternative: Deploy to Heroku

#### Backend (Heroku)
```bash
# Install Heroku CLI
cd backend
heroku create your-whiteboard-backend
heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app
heroku config:set NODE_ENV=production
git subtree push --prefix backend heroku main
```

#### Frontend (Vercel/Netlify)
Same as above, but use the Heroku backend URL.

### 4. Local Production Test

```bash
# Build frontend
cd frontend
npm run build
npm start

# Start backend in production mode
cd backend
NODE_ENV=production npm start
```

## Environment Variables Summary

### Production Backend
```env
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

### Production Frontend
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.render.com
```
