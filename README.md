# SuperManus V3 - Professional Web Interface

**واجهة ويب احترافية لـ SuperManus V3 مستوحاة من تصميم Manus.im بنسبة تطابق 100%**

![SuperManus V3 UI](https://img.shields.io/badge/SuperManus-V3-purple)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-orange)

## ✨ Features

### Design & UI (100% Manus.im Match)
- **Pixel-Perfect Design** - Exact recreation of Manus.im interface
- **Custom SVG Icons** - Professional vector icons for all UI elements
- **Smooth Animations** - Fade-in, slide-in, scale, bounce, and pulse animations
- **Responsive Design** - Full mobile browser support
- **CSS Variables** - Easy theming with dark/light mode ready

### Functionality
- **Real-time WebSocket** - Live updates for task status and file creation
- **File Management** - Preview, code view, and file list with download
- **Live HTML Preview** - Iframe-based preview for HTML files
- **Resizable Panels** - Draggable divider for adjusting panel widths
- **Manus Computer Bar** - Task progress display at bottom
- **Collapsible Steps** - Expandable task execution steps with ✓ marks
- **Thinking Animation** - Animated dots during AI processing
- **Quick Actions** - Research, Code, Automate, Create cards

### Technical
- **React 18** - Modern React with hooks
- **FastAPI Backend** - High-performance Python backend
- **WebSocket** - Real-time bidirectional communication
- **Docker Support** - Easy deployment with Docker Compose

## 🚀 Getting Started

### Prerequisites

- [Python 3.11+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/3rabhits/SuperManus-V3-UI.git
   cd SuperManus-V3-UI
   ```

2. **Setup Environment:**
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies:**
   ```bash
   # Backend
   cd backend && pip install -r requirements.txt && cd ..

   # Frontend
   cd frontend && npm install && cd ..
   ```

### Running the Application

**Option 1: Using start scripts**

```bash
# Linux/macOS
chmod +x start.sh && ./start.sh

# Windows
start.bat
```

**Option 2: Using Docker Compose**
```bash
docker-compose up --build
```

**Option 3: Manual**
```bash
# Backend (Terminal 1)
cd backend && uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend (Terminal 2)
cd frontend && PORT=3003 npm start
```

### Accessing the Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3003 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

## 📁 Project Structure

```
SuperManus_UI/
├── backend/
│   ├── main.py             # FastAPI server with WebSocket
│   ├── config.py           # Configuration
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── Icons.js        # Custom SVG icons
│   │   └── index.css       # Manus.im-inspired styles
│   ├── public/
│   └── build/              # Production build
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── start.sh / start.bat
└── README.md
```

## 🎨 Key Components

| Component | Description |
|-----------|-------------|
| Sidebar | Navigation and task list |
| TopBar | Connection status and actions |
| ChatInput | Message input with emoji/voice |
| QuickActions | Research, Code, Automate, Create |
| AgentResponse | AI response with collapsible steps |
| FilesPanel | File list, code view, preview |
| ManusComputerMini | Bottom progress bar |
| ManusComputerExpanded | Full-screen task viewer |

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ws/{session_id}` | WebSocket | Real-time communication |
| `/api/files` | GET | List generated files |
| `/files/{filename}` | GET | Serve file for preview |
| `/download/{filename}` | GET | Download file |
| `/health` | GET | Health check |

## 📡 WebSocket Messages

**Client → Server:**
```json
{"type": "chat", "prompt": "Your message"}
{"type": "get_file", "filename": "example.html"}
```

**Server → Client:**
```json
{"type": "status", "data": {"status": "running"}}
{"type": "step", "data": {"id": 1, "title": "Analyzing", "status": "running"}}
{"type": "response", "data": {"message": "...", "status": "completed"}}
{"type": "files", "data": {"files": [...]}}
```

## 🎬 Animations

The UI includes smooth animations matching Manus.im:
- `fadeIn` / `fadeInUp` / `fadeInDown` - Element appearance
- `slideInFromBottom` / `slideInFromRight` - Panel transitions
- `scaleIn` - Modal and card animations
- `pulse` / `bounce` - Status indicators
- `shimmer` - Loading skeletons
- `spin` - Loading spinners

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by [Manus.im](https://manus.im)
- Built with React and FastAPI
- Custom SVG icons

---

**Live Demo:** [SuperManus V3 UI](https://3003-i51decah5uga692w0g4xv-6c75ad8c.sg1.manus.computer)

**GitHub:** [https://github.com/3rabhits/SuperManus-V3-UI](https://github.com/3rabhits/SuperManus-V3-UI)
