# SuperManus V3 - Professional Web Interface

**واجهة ويب احترافية لـ SuperManus V3 مستوحاة من تصميم Manus.im**

[![SuperManus UI](https://i.imgur.com/your-screenshot.png)](https://github.com/3rabhits/SuperManus-V3-UI)

This project provides a real, working, and professional web interface for SuperManus V3, heavily inspired by the clean and functional design of Manus.im. It includes a FastAPI backend with WebSocket for real-time updates and a React frontend for a modern user experience.

## ✨ Features

- **Manus.im Inspired Design**: Clean, modern, and responsive UI.
- **Real-time WebSocket**: Instant updates for task status, steps, and file creation.
- **Files Panel**: Preview, code view, and file list with download functionality.
- **Resizable Panels**: Adjust the layout to your liking.
- **Error Handling**: Toast notifications for a better user experience.
- **Cross-Platform**: Works on Windows, macOS, and Linux.
- **Docker Support**: Easy deployment with Docker.

## 🚀 Getting Started

### Prerequisites

- [Python 3.11+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional)
- [OpenManus V3](https://github.com/your-openmanus-repo) (or set `OPENMANUS_PATH`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/3rabhits/SuperManus-V3-UI.git
   cd SuperManus-V3-UI
   ```

2. **Setup Environment:**
   Copy `.env.example` to `.env` and configure the paths and API key if needed.
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   cd ..

   # Frontend
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

We provide multiple ways to run the application:

**1. Using the start scripts:**

- **Linux/macOS:**
  ```bash
  chmod +x start.sh
  ./start.sh
  ```
- **Windows:**
  ```bash
  start.bat
  ```

**2. Using Docker Compose:**

   ```bash
   docker-compose up --build
   ```

**3. Manually:**

   - **Backend:**
     ```bash
     cd backend
     uvicorn main:app --host 0.0.0.0 --port 8000
     ```
   - **Frontend (in another terminal):**
     ```bash
     cd frontend
     PORT=3003 npm start
     ```

### Accessing the Application

- **Frontend**: [http://localhost:3003](http://localhost:3003)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
SuperManus_UI/
├── backend/              # FastAPI server
│   ├── main.py
│   ├── config.py
│   └── requirements.txt
├── frontend/             # React frontend
│   ├── src/
│   │   ├── App.js
│   │   └── index.css
│   └── ...
├── .env.example          # Environment configuration
├── docker-compose.yml    # Docker support
├── Dockerfile.backend
├── Dockerfile.frontend
├── start.sh              # Start script for Linux/macOS
├── start.bat             # Start script for Windows
└── README.md
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
