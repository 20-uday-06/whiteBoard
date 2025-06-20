@echo off
echo 🔧 Setting up Git repository for deployment...

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    
    REM Add a default .gitignore if it doesn't exist
    if not exist ".gitignore" (
        echo 📝 Creating .gitignore file...
        (
echo # Dependencies
echo node_modules/
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo.
echo # Production builds
echo .next/
echo out/
echo dist/
echo build/
echo.
echo # Environment variables
echo .env
echo .env.local
echo .env.development.local
echo .env.test.local
echo .env.production.local
echo.
echo # IDE
echo .vscode/
echo .idea/
echo *.swp
echo *.swo
echo.
echo # OS
echo .DS_Store
echo Thumbs.db
echo.
echo # Logs
echo *.log
        ) > .gitignore
    )
) else (
    echo ✅ Git repository already initialized
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  No remote origin found. Please add your repository URL:
    echo    git remote add origin ^<your-repository-url^>
    echo.
) else (
    echo ✅ Remote origin configured
)

REM Check git config
for /f "delims=" %%i in ('git config user.name 2^>nul') do set git_name=%%i
for /f "delims=" %%i in ('git config user.email 2^>nul') do set git_email=%%i

if "%git_name%"=="" (
    echo ⚠️  Git user not configured. Please set your Git credentials:
    echo    git config user.name "Your Name"
    echo    git config user.email "your.email@example.com"
    echo.
) else (
    echo ✅ Git user configured: %git_name%
)

echo 🎉 Git setup complete!
pause
