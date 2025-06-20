@echo off
echo Building for production...
cd frontend
npm run build

if %errorlevel% equ 0 (
    echo Build successful! Starting production server...
    npm start
) else (
    echo Build failed! Please check the errors above.
    pause
)
