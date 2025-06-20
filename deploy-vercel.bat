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
    echo 🚀 To deploy to Vercel:
    echo 1. Install Vercel CLI: npm install -g vercel
    echo 2. Login: vercel login  
    echo 3. Deploy: vercel --prod
    echo.
    echo 📋 Environment variables needed on Vercel:
    echo - NEXT_PUBLIC_BACKEND_URL: https://whiteboard-collaboration-backend.onrender.com
    echo.
    echo 💡 After deployment, remember to update your Render backend's FRONTEND_URL!
) else (
    echo ❌ Build failed! Please fix the errors before deploying.
)

pause
