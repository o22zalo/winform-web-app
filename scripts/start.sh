#!/bin/bash

echo "🚀 Starting WinForm Web App..."

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
  echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
  exit 1
fi

echo "✅ PostgreSQL is running"

# Start backend
echo "🔧 Starting backend..."
cd backend
if [ ! -d "node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  npm install
fi

if [ ! -f ".env" ]; then
  echo "⚠️  .env file not found. Copying from .env.example..."
  cp .env.example .env
  echo "⚠️  Please edit backend/.env with your database credentials"
  exit 1
fi

npm run dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Start frontend
echo "🎨 Starting frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  npm install
fi

if [ ! -f ".env.local" ]; then
  echo "📝 Creating .env.local..."
  cp .env.local.example .env.local
fi

npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "✅ All services started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
