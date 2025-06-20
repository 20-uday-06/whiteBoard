#!/bin/bash
echo "🔧 Setting up Git repository for deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    
    # Add a default .gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        echo "📝 Creating .gitignore file..."
        cat > .gitignore << EOL
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
.next/
out/
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
.nyc_output/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Temporary folders
tmp/
temp/
EOL
    fi
else
    echo "✅ Git repository already initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  No remote origin found. Please add your repository URL:"
    echo "   git remote add origin <your-repository-url>"
    echo ""
else
    echo "✅ Remote origin configured: $(git remote get-url origin)"
fi

# Check git config
if [ -z "$(git config user.name)" ] || [ -z "$(git config user.email)" ]; then
    echo "⚠️  Git user not configured. Please set your Git credentials:"
    echo "   git config user.name 'Your Name'"
    echo "   git config user.email 'your.email@example.com'"
    echo ""
else
    echo "✅ Git user configured: $(git config user.name) <$(git config user.email)>"
fi

echo "🎉 Git setup complete!"
