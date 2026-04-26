# Winform Web App

Ứng dụng quản lý hiện đại với Next.js 16, React 19, và Node.js/Express.

## 🚀 Quick Start

```bash
# Clone repository
git clone <repository-url>
cd winform-web-app

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Start development servers
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2
```

**Truy cập:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 📁 Cấu Trúc Dự Án

```
winform-web-app/
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # React Components
│   │   │   ├── auth/        # Authentication
│   │   │   ├── common/      # Reusable components
│   │   │   ├── layout/      # Layout components
│   │   │   └── modules/     # Feature modules
│   │   ├── lib/             # Core Libraries
│   │   │   ├── api/         # API Services
│   │   │   ├── config/      # Configuration
│   │   │   ├── store/       # State Management
│   │   │   └── apiClient.ts # HTTP Client
│   │   └── types/           # TypeScript Types
│   └── package.json
│
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── config/          # Configuration
│   │   ├── controllers/     # Request Handlers
│   │   ├── middleware/      # Express Middleware
│   │   ├── repositories/    # Database Layer
│   │   ├── routes/          # API Routes
│   │   ├── services/        # Business Logic
│   │   └── utils/           # Utilities
│   └── package.json
│
└── docs/                     # Documentation
    ├── api/                  # API Documentation
    ├── architecture/         # Architecture Docs
    └── guides/               # User Guides
```

## 🎯 Tech Stack

### Frontend
- **Framework:** Next.js 16.2.4 (App Router)
- **UI Library:** React 19.2.5
- **UI Components:** Material-UI 9.0.0
- **Data Grid:** AG Grid 35.2.1
- **State Management:** Zustand 5.0.12
- **Data Fetching:** TanStack Query 5.100.5
- **Language:** TypeScript 5.7.3

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.2.1
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken 9.0.3)
- **Validation:** Express Validator 7.3.2
- **Security:** Helmet, CORS, Compression

## ✨ Features

### Frontend
- ✅ Centralized API client với type safety
- ✅ Environment configuration system
- ✅ Comprehensive error handling
- ✅ Tab-based workspace
- ✅ Dark/Light theme
- ✅ Responsive layout
- ✅ PWA support

### Backend
- ✅ Layered architecture (Routes → Controllers → Services → Repositories)
- ✅ Centralized error handling
- ✅ Request/Response logging
- ✅ Input validation
- ✅ JWT authentication
- ✅ Standardized API responses

## 📚 Documentation

- **[Architecture](./docs/architecture/README.md)** - System architecture và design patterns
- **[API Reference](./docs/api/README.md)** - API endpoints và usage
- **[Development Guide](./docs/guides/DEVELOPMENT.md)** - Development workflow
- **[Deployment Guide](./docs/guides/DEPLOYMENT.md)** - Production deployment

## 🔧 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_APP_NAME=Winform Web App
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Backend (.env)
```bash
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
LOG_LEVEL=info
```

## 🛠️ Development

### Frontend Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Lint code
```

### Backend Commands
```bash
npm run dev      # Start with auto-reload
npm start        # Start production server
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Health Check
- `GET /health` - Server health status

## 🤝 Contributing

1. Đọc [Development Guide](./docs/guides/DEVELOPMENT.md)
2. Follow coding standards
3. Sử dụng API services, không gọi fetch trực tiếp
4. Luôn handle errors properly
5. Add logging cho operations quan trọng
6. Write type-safe code

## 📄 License

Private - Internal use only

---

**Version:** 1.0.0  
**Last Updated:** 2026-04-26  
**Powered by:** Claude Opus 4.6
