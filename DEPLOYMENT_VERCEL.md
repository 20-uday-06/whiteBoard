# Deployment Guide

## Prerequisites
- Git repository configured
- Vercel account
- Backend already deployed on Render

## Quick Setup

### 1. Git Setup (First time only)
```bash
# Run the setup script
./setup-git.sh    # Linux/Mac
setup-git.bat     # Windows

# If remote origin not configured, add your repository:
git remote add origin <your-repository-url>
```

### 2. Deploy to Vercel
```bash
# Run the deployment script
./deploy-vercel.sh    # Linux/Mac
deploy-vercel.bat     # Windows
```

The script will automatically:
1. ✅ Commit and push changes to Git
2. ✅ Install dependencies
3. ✅ Test production build
4. ✅ Provide deployment instructions

### Steps to Deploy

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the frontend directory**:
   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? `collaborative-whiteboard`
   - In which directory is your code located? `./` (current directory)

5. **Set Environment Variables** (if needed):
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable:
     - `NEXT_PUBLIC_BACKEND_URL`: `https://whiteboard-collaboration-backend.onrender.com`

### Production Environment Variables

The following environment variables are configured for production:

- **Frontend (Vercel)**:
  - `NEXT_PUBLIC_BACKEND_URL`: Points to your Render backend
  
- **Backend (Render)**:
  - `FRONTEND_URL`: Should be set to your Vercel domain
  - `MONGODB_URI`: Your MongoDB connection string
  - `NODE_ENV`: production

### Post-Deployment Configuration

After deploying to Vercel, you'll need to update your backend environment variables on Render:

1. Go to your Render dashboard
2. Navigate to your backend service
3. Update the `FRONTEND_URL` environment variable to your new Vercel domain
4. Redeploy the backend service

### Testing

1. Open your Vercel deployment URL
2. Test real-time collaboration by opening multiple tabs
3. Verify socket connections are working
4. Test drawing, chat, and user presence features

### Troubleshooting

- **CORS Issues**: Ensure backend `FRONTEND_URL` matches your Vercel domain
- **Socket Connection Issues**: Check browser developer tools for WebSocket connection errors
- **Build Errors**: Check Vercel build logs in the dashboard
