@echo off
echo 🚀 Preparing for Vercel deployment...

REM Save current directory
set "ORIGINAL_DIR=%CD%"

REM Navigate to project root (where this script is located)
cd /d "%~dp0"

REM Git operations
echo 📦 Committing and pushing changes to Git...

REM Add all changes
git add .

REM Check if there are changes to commit using a simpler approach
git status --porcelain | findstr /r "." > nul
if %errorlevel% neq 0 (
    echo ℹ️  No new changes to commit
) else (
    REM Commit with timestamp
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "timestamp=%dt:~0,4%-%dt:~4,2%-%dt:~6,2% %dt:~8,2%:%dt:~10,2%:%dt:~12,2%"
    git commit -m "Deploy updates - %timestamp%"
    echo ✅ Changes committed: Deploy updates - %timestamp%
)

REM Push to remote repository
echo ⬆️  Pushing to remote repository...
git push origin main
if %errorlevel% neq 0 (
    git push origin master
)

if %errorlevel% equ 0 (
    echo ✅ Successfully pushed to Git
) else (
    echo ⚠️  Warning: Failed to push to Git. Continuing with deployment...
)

REM Navigate to frontend directory
cd frontend

REM Install dependencies
echo Installing dependencies...
call npm install

REM Run build to check for errors
echo Testing production build...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful! Ready for deployment.
    echo.
    echo 🚀 Deploy Options:
    echo.
    echo 🌐 Option 1: Vercel Website ^(Recommended - Easiest^)
    echo 1. Go to https://vercel.com
    echo 2. Click 'New Project' → 'Import Git Repository'
    echo 3. Select your repository: 20-uday-06/whiteBoard
    echo 4. Set Root Directory to: frontend
    echo 5. Add Environment Variable:
    echo    NEXT_PUBLIC_BACKEND_URL = https://whiteboard-collaboration-backend.onrender.com
    echo 6. Click Deploy!
    echo.
    echo � Option 2: Vercel CLI
    echo 1. Install: npm install -g vercel
    echo 2. Login: vercel login  
    echo 3. Deploy: vercel --prod
    echo.
    echo �💡 After deployment, update your Render backend's FRONTEND_URL to your new Vercel domain!
) else (
    echo ❌ Build failed! Please fix the errors before deploying.
)

pause
