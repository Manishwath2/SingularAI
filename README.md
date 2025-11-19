# SingulynAI - Cognitive Super-App

A futuristic, offline-capable, multi-tenant chat platform with "Midnight Neon" aesthetic and autonomous agent capabilities.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)

## 🌟 Features

- **Neural Glass Design**: Glassmorphism UI with Electric Cyan (#00F0FF) and Neon Purple (#7B2CBF) accents
- **Local-First Architecture**: Offline-capable with WebLLM integration
- **Multi-Agent Orchestration**: LangGraph-powered agent workflows
- **Generative UI**: Streaming React components instead of just text
- **Real-time Communication**: WebSocket-based chat with FastAPI backend
- **Mobile-Friendly**: Responsive design that works on all devices

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** (App Router, Server Actions)
- **TypeScript**
- **Tailwind CSS** with custom Neural Glass theme
- **Framer Motion** for animations
- **Zustand** for state management
- **Lucide React** for icons

### Backend
- **Python FastAPI** (Asynchronous)
- **WebSockets** (Real-time)
- **LangGraph** (Multi-Agent Swarms)
- **LangChain** (AI Orchestration)

### Database
- **PostgreSQL** (via Supabase or Docker)
- **Qdrant** (Vector DB)

## 📁 Project Structure

```
/singulyn-ai
├── apps/
│   ├── web/                 # Next.js 15 frontend
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   │   ├── layout/    # Layout components (Sidebar, Chat)
│   │   │   └── ui/        # UI components
│   │   └── lib/           # Utilities
│   └── docs/              # Documentation
├── packages/
│   ├── ui/                # Shared UI components
│   └── database/          # Schema & Migrations
└── backend/
    ├── app/
    │   ├── agents/        # LangGraph workflows
    │   ├── core/          # Config, Security
    │   └── api/           # API Routes
    ├── main.py            # FastAPI entry point
    └── requirements.txt   # Python dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm
- Python 3.10+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manishwath2/SingularAI.git
   cd SingularAI
   ```

2. **Install frontend dependencies**
   ```bash
   cd apps/web
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../../backend
   pip3 install -r requirements.txt
   ```

### Running the Application

#### Frontend (Next.js)

```bash
# From the apps/web directory
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### Backend (FastAPI)

```bash
# From the backend directory
python3 main.py
```

The backend will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

## 🎨 Design System

### Color Palette (Neural Glass Theme)

- **Background**: Deep Midnight Blue (#050510)
- **Primary**: Electric Cyan (#00F0FF)
- **Secondary**: Neon Purple (#7B2CBF)
- **Accent**: Magenta (#FF00FF)

### Typography

- **Sans-serif**: Inter
- **Display**: Rajdhani
- **Monospace**: JetBrains Mono

### Key Design Elements

- Glassmorphism with backdrop blur
- Neon glow effects on interactive elements
- Smooth animations with Framer Motion
- Responsive grid layout

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in `apps/web`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create a `.env` file in `backend`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/singulyn
OPENAI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

## 🧪 Testing

```bash
# Frontend tests
cd apps/web
npm test

# Backend tests
cd backend
pytest
```

## 📦 Building for Production

### Frontend

```bash
cd apps/web
npm run build
npm run start
```

### Backend

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🗺️ Roadmap

- [x] Project structure and setup
- [x] Midnight Neon theme configuration
- [x] Sidebar component with glassmorphism
- [x] Chat interface with message streaming
- [x] FastAPI backend with WebSocket support
- [ ] WebLLM integration for local inference
- [ ] RxDB/ElectricSQL for local-first sync
- [ ] LangGraph multi-agent workflows
- [ ] Admin panel (/admin/portal)
- [ ] User authentication
- [ ] Database integration
- [ ] Vector database setup
- [ ] Deployment configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Shadcn/UI for component inspiration
- Aceternity UI for cyberpunk effects
- The Next.js and FastAPI teams

---

Built with ❤️ using Next.js 15 and FastAPI

