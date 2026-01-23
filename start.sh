#!/bin/bash

echo "🚀 Starting SuperManus V3 UI..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Start Backend
echo -e "${BLUE}[1/2] Starting Backend API...${NC}"
cd /home/ubuntu/SuperManus_UI/backend
pip install -q -r requirements.txt
nohup python main.py > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:8000 > /dev/null; then
    echo -e "${GREEN}✅ Backend is running on http://localhost:8000${NC}"
else
    echo "⚠️ Backend may still be starting..."
fi

# Start Frontend
echo ""
echo -e "${BLUE}[2/2] Starting Frontend...${NC}"
cd /home/ubuntu/SuperManus_UI/frontend
npm install --legacy-peer-deps --silent 2>/dev/null
PORT=3003 npm start &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}SuperManus V3 UI is starting!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Backend API: http://localhost:8000"
echo "Frontend UI: http://localhost:3003"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait
