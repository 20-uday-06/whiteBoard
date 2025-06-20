#!/bin/bash
echo "🚀 Preparing for Vercel deployment..."

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# Git operations
echo "📦 Committing and pushing changes to Git..."

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No new changes to commit"
else
    # Commit with timestamp
    commit_message="Deploy updates - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"
    echo "✅ Changes committed: $commit_message"
fi

# Push to remote repository
echo "⬆️  Pushing to remote repository..."
git push origin main || git push origin master

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to Git"
else
    echo "⚠️  Warning: Failed to push to Git. Continuing with deployment..."
fi

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing dependencies..."
npm install

# Run build to check for errors
echo "Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    echo ""
    echo "🚀 Deploy Options:"
    echo ""
    echo "🌐 Option 1: Vercel Website (Recommended - Easiest)"
    echo "1. Go to https://vercel.com"
    echo "2. Click 'New Project' → 'Import Git Repository'"
    echo "3. Select your repository: 20-uday-06/whiteBoard"
    echo "4. Set Root Directory to: frontend"
    echo "5. Add Environment Variable:"
    echo "   NEXT_PUBLIC_BACKEND_URL = https://whiteboard-collaboration-backend.onrender.com"
    echo "6. Click Deploy!"
    echo ""
    echo "� Option 2: Vercel CLI"
    echo "1. Install: npm install -g vercel"
    echo "2. Login: vercel login"
    echo "3. Deploy: vercel --prod"
    echo ""
    echo "�💡 After deployment, update your Render backend's FRONTEND_URL to your new Vercel domain!"
else
    echo "❌ Build failed! Please fix the errors before deploying."
fi
