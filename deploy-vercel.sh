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
    echo "🚀 To deploy to Vercel:"
    echo "1. Install Vercel CLI: npm install -g vercel"
    echo "2. Login: vercel login"
    echo "3. Deploy: vercel --prod"
    echo ""
    echo "📋 Environment variables needed on Vercel:"
    echo "- NEXT_PUBLIC_BACKEND_URL: https://whiteboard-collaboration-backend.onrender.com"
    echo ""
    echo "💡 After deployment, remember to update your Render backend's FRONTEND_URL!"
else
    echo "❌ Build failed! Please fix the errors before deploying."
fi
