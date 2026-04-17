@echo off
REM 🚀 Zenvest One-Click Deployment Script (Windows)
REM Usage: deploy.bat [vercel|netlify|docker|firebase]

setlocal enabledelayedexpansion

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=vercel

set PROJECT_NAME=zenvest

echo.
echo 🚀 Zenvest Deployment Script
echo ==============================
echo.

REM Check if we're in the right directory
if not exist package.json (
  echo Error: package.json not found. Are you in the project root?
  exit /b 1
)

REM Build the project first
echo 📦 Building project...
call npm run build

if not exist dist (
  echo Error: Build failed - dist directory not found
  exit /b 1
)

echo ✅ Build successful!
echo.

REM Deploy based on environment
if /i "%ENVIRONMENT%"=="vercel" (
  echo 🌐 Deploying to Vercel...
  
  REM Check if Vercel CLI is installed
  where vercel >nul 2>nul
  if %errorlevel% neq 0 (
    echo Error: Vercel CLI not found. Install with: npm install -g vercel
    exit /b 1
  )
  
  REM Deploy
  call vercel --prod
  echo ✅ Deployed to Vercel!
  
) else if /i "%ENVIRONMENT%"=="netlify" (
  echo 🌐 Deploying to Netlify...
  
  REM Check if Netlify CLI is installed
  where netlify >nul 2>nul
  if %errorlevel% neq 0 (
    echo Error: Netlify CLI not found. Install with: npm install -g netlify-cli
    exit /b 1
  )
  
  REM Deploy
  call netlify deploy --prod --dir=dist
  echo ✅ Deployed to Netlify!
  
) else if /i "%ENVIRONMENT%"=="firebase" (
  echo 🔥 Deploying to Firebase...
  
  REM Check if Firebase CLI is installed
  where firebase >nul 2>nul
  if %errorlevel% neq 0 (
    echo Error: Firebase CLI not found. Install with: npm install -g firebase-tools
    exit /b 1
  )
  
  REM Check if .firebaserc exists
  if not exist .firebaserc (
    echo Error: .firebaserc not found. Run 'firebase init' first
    exit /b 1
  )
  
  REM Deploy
  call firebase deploy --only hosting
  echo ✅ Deployed to Firebase Hosting!
  
) else if /i "%ENVIRONMENT%"=="docker" (
  echo 🐳 Building Docker image...
  
  REM Check if Docker is installed
  where docker >nul 2>nul
  if %errorlevel% neq 0 (
    echo Error: Docker not found. Install Docker from https://docker.com
    exit /b 1
  )
  
  REM Build Docker image
  call docker build -t %PROJECT_NAME%:latest .
  
  echo ✅ Docker image built successfully!
  echo.
  echo Run the following to start the container:
  echo   docker run -p 3000:3000 %PROJECT_NAME%:latest
  echo.
  echo Or with docker-compose:
  echo   docker-compose up
  
) else (
  echo Error: Unknown deployment target '%ENVIRONMENT%'
  echo.
  echo Usage: deploy.bat [vercel^|netlify^|firebase^|docker]
  echo.
  echo Examples:
  echo   deploy.bat vercel     # Deploy to Vercel
  echo   deploy.bat netlify    # Deploy to Netlify
  echo   deploy.bat firebase   # Deploy to Firebase Hosting
  echo   deploy.bat docker     # Build Docker image
  exit /b 1
)

echo.
echo 🎉 Deployment complete!
echo.
