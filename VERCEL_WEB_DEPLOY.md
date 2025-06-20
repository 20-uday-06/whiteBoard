# 🌐 Vercel Web Deployment - Step by Step Guide

## ✅ Prerequisites Complete
- ✅ Code is committed and pushed to Git
- ✅ Production build tested successfully
- ✅ Backend running on Render

## 🚀 Deploy via Vercel Website (5 minutes)

### Step 1: Go to Vercel
- Open [vercel.com](https://vercel.com) in your browser
- Sign in with GitHub (recommended)

### Step 2: Import Your Project
- Click **"New Project"** button
- Select **"Import Git Repository"**
- Find and select: `20-uday-06/whiteBoard`

### Step 3: Configure Project Settings
**⚠️ IMPORTANT: Root Directory Setting**
- **Root Directory**: `frontend` ← **Must set this!**
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Environment Variables
Click **"Environment Variables"** and add:
- **Name**: `NEXT_PUBLIC_BACKEND_URL`
- **Value**: `https://whiteboard-collaboration-backend.onrender.com`
- **Environment**: All (Production, Preview, Development)

### Step 5: Deploy
- Click **"Deploy"** button
- Wait 1-2 minutes for deployment
- Get your deployment URL (e.g., `https://your-app-name.vercel.app`)

## 🔧 Post-Deployment Configuration

### Update Backend CORS
1. Go to your [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Environment** section
4. Update `FRONTEND_URL` to your new Vercel domain
5. **Redeploy** the backend service

### Test Your Deployment
1. Open your Vercel URL
2. Check connection status (should show "Connected")
3. Test real-time drawing in multiple tabs
4. Test chat functionality

## 🎉 You're Done!

Your collaborative whiteboard is now live and accessible worldwide!

## 📞 Need Help?
- Check Vercel deployment logs if build fails
- Ensure `frontend` is set as root directory
- Verify environment variables are set correctly
