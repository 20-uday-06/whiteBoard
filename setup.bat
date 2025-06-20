@echo off
echo Installing Collaborative Whiteboard Application...
echo.

echo Step 1: Installing root dependencies...
npm install
echo.

echo Step 2: Installing backend dependencies...
cd backend
npm install
cd ..
echo.

echo Step 3: Installing frontend dependencies...
cd frontend
npm install
cd ..
echo.

echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Run "npm run dev" to start both servers
echo 2. Or run backend and frontend separately:
echo    - Backend: "cd backend && npm run dev"
echo    - Frontend: "cd frontend && npm run dev"
echo.
echo The application will be available at:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:5000
echo.
pause
