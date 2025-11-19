# SingulynAI Development Guide

## Quick Start

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

2. **Frontend Setup**
   ```bash
   cd apps/web
   npm install
   cp .env.example .env.local
   ```

3. **Backend Setup**
   ```bash
   cd ../../backend
   pip3 install -r requirements.txt
   cp .env.example .env
   ```

### Running the Application

#### Frontend (Development Mode)
```bash
cd apps/web
npm run dev
```
Visit: http://localhost:3000

#### Backend (Development Mode)
```bash
cd backend
python3 main.py
```
API: http://localhost:8000
Docs: http://localhost:8000/docs

## Project Structure

```
/singulyn-ai
├── apps/
│   ├── web/                      # Next.js 15 Frontend
│   │   ├── app/                 # App Router
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── page.tsx        # Home page
│   │   │   └── globals.css     # Global styles
│   │   ├── components/
│   │   │   ├── layout/         # Layout components
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── ChatInterface.tsx
│   │   │   └── ui/             # UI components
│   │   ├── lib/                # Utilities
│   │   └── public/             # Static assets
│   └── docs/                   # Documentation
├── packages/
│   ├── ui/                     # Shared UI components (future)
│   └── database/               # Database schemas (future)
└── backend/
    ├── app/
    │   ├── agents/             # LangGraph workflows
    │   │   └── workflows.py
    │   ├── core/               # Core config
    │   │   └── config.py
    │   └── api/                # API routes (future)
    └── main.py                 # FastAPI entry point
```

## Key Features

### 1. Midnight Neon Theme
- Deep Midnight Blue (#050510) background
- Electric Cyan (#00F0FF) primary color
- Neon Purple (#7B2CBF) secondary color
- Glassmorphism effects with backdrop blur

### 2. Sidebar Navigation
- Collapsible sidebar with smooth animations
- Search for Person/Mentor with debounce
- Create Persona interface
- Learn with AI dropdown (Math, Physics, Coding, etc.)
- User profile section

### 3. Chat Interface
- Real-time message display
- Typing indicators
- Message timestamps
- Gradient message bubbles for user messages
- Glassmorphism for AI responses

### 4. Backend Architecture
- FastAPI with WebSocket support
- LangGraph for multi-agent workflows
- Supervisor and Worker agents pattern
- Real-time communication

## Development Commands

### Frontend
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Lint
npm run lint
```

### Backend
```bash
# Development (with auto-reload)
python3 main.py

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Styling Guide

### Custom Tailwind Classes

**Glassmorphism:**
```jsx
<div className="glass">Content</div>
<div className="glass-light">Content</div>
```

**Neon Effects:**
```jsx
<div className="neon-cyan">Cyan glow</div>
<div className="neon-purple">Purple glow</div>
<h1 className="neon-text-cyan">Cyan text</h1>
```

### Custom CSS Variables
```css
--background: #050510
--primary: #00F0FF
--secondary: #7B2CBF
```

## API Endpoints

### REST Endpoints
- `GET /` - Root endpoint
- `GET /health` - Health check

### WebSocket Endpoints
- `WS /ws/chat` - Chat WebSocket connection

## Future Enhancements

1. **WebLLM Integration** - Local inference in browser
2. **RxDB/ElectricSQL** - Local-first sync
3. **Admin Panel** - User management at /admin/portal
4. **Vector Database** - Qdrant integration
5. **Authentication** - User auth and sessions
6. **Persona Management** - Create and manage AI personas
7. **Multi-Agent Workflows** - Complete LangGraph implementation

## Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Build errors:**
```bash
# Clean build cache
rm -rf .next
npm run build
```

### Backend Issues

**Port already in use:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**Dependencies issues:**
```bash
# Reinstall dependencies
pip3 install -r requirements.txt --force-reinstall
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
