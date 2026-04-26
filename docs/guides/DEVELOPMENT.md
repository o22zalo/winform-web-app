# Development Guide

## Setup Development Environment

### Prerequisites

- Node.js 18+ 
- PostgreSQL 11+
- Git
- Code Editor (VS Code recommended)

### Initial Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd winform-web-app
```

2. **Install Dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Environment Configuration**
```bash
# Backend
cp backend/.env.example backend/.env
# Edit .env with your database credentials

# Frontend
cp frontend/.env.example frontend/.env.local
# Edit .env.local if needed
```

4. **Database Setup**
```bash
# Create database
createdb winform_db

# Run migrations (if available)
# npm run migrate
```

5. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Project Structure

### Frontend Structure

```
frontend/src/
├── app/                      # Next.js App Router
│   ├── dashboard/           # Dashboard pages
│   ├── login/              # Login page
│   └── layout.tsx          # Root layout
│
├── components/              # React Components
│   ├── auth/               # Authentication components
│   │   └── LoginScreen.tsx
│   ├── common/             # Reusable components
│   │   ├── AppGrid.tsx
│   │   ├── CrudToolbar.tsx
│   │   ├── FormDialog.tsx
│   │   └── ConfirmDialog.tsx
│   ├── layout/             # Layout components
│   │   ├── AppShell.tsx
│   │   ├── MenuStrip.tsx
│   │   ├── SidebarExplorer.tsx
│   │   ├── TabWorkspace.tsx
│   │   └── StatusBar.tsx
│   └── modules/            # Feature modules
│       ├── UsersModule.tsx
│       ├── PatientsModule.tsx
│       └── DepartmentsModule.tsx
│
├── lib/                     # Core Libraries
│   ├── api/                # API Services
│   │   ├── index.ts
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── customer.service.ts
│   │   ├── supplier.service.ts
│   │   ├── order.service.ts
│   │   └── inventory.service.ts
│   ├── config/             # Configuration
│   │   ├── env.ts
│   │   └── appConfig.ts
│   ├── store/              # State Management
│   │   └── uiStore.ts
│   ├── utils/              # Utilities
│   └── apiClient.ts        # HTTP Client
│
└── types/                   # TypeScript Types
```

### Backend Structure

```
backend/src/
├── config/                  # Configuration
│   ├── database.js         # Database connection
│   └── env.js              # Environment config
│
├── controllers/            # Request Handlers
│   └── authController.js
│
├── middleware/             # Express Middleware
│   ├── authMiddleware.js   # JWT verification
│   ├── errorHandler.js     # Error handling
│   ├── requestLogger.js    # Request logging
│   └── validate.js         # Input validation
│
├── repositories/           # Database Layer
│   └── authRepository.js
│
├── routes/                 # API Routes
│   └── auth.routes.js
│
├── services/               # Business Logic
│   └── authService.js
│
├── utils/                  # Utilities
│   ├── errors.js           # Custom errors
│   ├── logger.js           # Logging system
│   └── response.js         # Response helpers
│
└── server.js               # Entry point
```

## Development Workflow

### Adding a New Feature

#### 1. Frontend - Create API Service

```typescript
// frontend/src/lib/api/feature.service.ts
import { apiClient } from '@/lib/apiClient'

export interface Feature {
  id: string
  name: string
}

export const featureService = {
  getAll: async (): Promise<Feature[]> => {
    return apiClient.get<Feature[]>('/features')
  },

  getById: async (id: string): Promise<Feature> => {
    return apiClient.get<Feature>(`/features/${id}`)
  },

  create: async (data: Partial<Feature>): Promise<Feature> => {
    return apiClient.post<Feature>('/features', data)
  },

  update: async (id: string, data: Partial<Feature>): Promise<Feature> => {
    return apiClient.put<Feature>(`/features/${id}`, data)
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/features/${id}`)
  },
}
```

#### 2. Frontend - Create Module Component

```typescript
// frontend/src/components/modules/FeatureModule.tsx
'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { featureService } from '@/lib/api'
import { CrudToolbar } from '@/components/common/CrudToolbar'
import { AppGrid } from '@/components/common/AppGrid'
import { useAppStore } from '@/lib/store/uiStore'

export function FeatureModule() {
  const queryClient = useQueryClient()
  const [selectedItem, setSelectedItem] = useState(null)

  const { data = [], isLoading } = useQuery({
    queryKey: ['features'],
    queryFn: async () => {
      const res = await featureService.getAll()
      return Array.isArray(res) ? res : (res.data || [])
    },
  })

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, p: 1, overflow: 'auto' }}>
        <AppGrid 
          rowData={data} 
          columnDefs={columnDefs} 
          onRowSelected={setSelectedItem} 
          loading={isLoading} 
        />
      </Box>
      <CrudToolbar
        onAdd={() => {/* handle add */}}
        onEdit={() => {/* handle edit */}}
        onDelete={() => {/* handle delete */}}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: ['features'] })}
        onClose={() => useAppStore.getState().closeTab('features')}
        editDisabled={!selectedItem}
        deleteDisabled={!selectedItem}
      />
    </Box>
  )
}
```

#### 3. Backend - Create Repository

```javascript
// backend/src/repositories/featureRepository.js
import { pool } from '../config/database.js'
import { DatabaseError } from '../utils/errors.js'
import { logger } from '../utils/logger.js'

export const featureRepository = {
  async findAll() {
    try {
      const result = await pool.query('SELECT * FROM features ORDER BY created_at DESC')
      return result.rows
    } catch (error) {
      logger.error('Database error in findAll', error)
      throw new DatabaseError('Failed to fetch features', error)
    }
  },

  async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM features WHERE id = $1', [id])
      return result.rows[0]
    } catch (error) {
      logger.error('Database error in findById', error)
      throw new DatabaseError('Failed to fetch feature', error)
    }
  },

  async create(data) {
    try {
      const result = await pool.query(
        'INSERT INTO features (name) VALUES ($1) RETURNING *',
        [data.name]
      )
      return result.rows[0]
    } catch (error) {
      logger.error('Database error in create', error)
      throw new DatabaseError('Failed to create feature', error)
    }
  },
}
```

#### 4. Backend - Create Service

```javascript
// backend/src/services/featureService.js
import { featureRepository } from '../repositories/featureRepository.js'
import { NotFoundError, ValidationError } from '../utils/errors.js'
import { logger } from '../utils/logger.js'

export const featureService = {
  async getAll() {
    logger.info('Fetching all features')
    return await featureRepository.findAll()
  },

  async getById(id) {
    logger.info('Fetching feature', { id })
    const feature = await featureRepository.findById(id)
    
    if (!feature) {
      throw new NotFoundError('Feature not found')
    }
    
    return feature
  },

  async create(data) {
    if (!data.name) {
      throw new ValidationError('Name is required')
    }

    logger.info('Creating feature', { name: data.name })
    return await featureRepository.create(data)
  },
}
```

#### 5. Backend - Create Controller

```javascript
// backend/src/controllers/featureController.js
import { featureService } from '../services/featureService.js'
import { ApiResponse } from '../utils/response.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const featureController = {
  getAll: asyncHandler(async (req, res) => {
    const features = await featureService.getAll()
    return ApiResponse.success(res, features)
  }),

  getById: asyncHandler(async (req, res) => {
    const feature = await featureService.getById(req.params.id)
    return ApiResponse.success(res, feature)
  }),

  create: asyncHandler(async (req, res) => {
    const feature = await featureService.create(req.body)
    return ApiResponse.created(res, feature, 'Feature created successfully')
  }),
}
```

#### 6. Backend - Create Routes

```javascript
// backend/src/routes/feature.routes.js
import express from 'express'
import { body } from 'express-validator'
import { featureController } from '../controllers/featureController.js'
import { validate } from '../middleware/validate.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, featureController.getAll)
router.get('/:id', authMiddleware, featureController.getById)
router.post('/',
  authMiddleware,
  [body('name').notEmpty().withMessage('Name is required')],
  validate,
  featureController.create
)

export default router
```

#### 7. Backend - Register Routes

```javascript
// backend/src/server.js
import featureRoutes from './routes/feature.routes.js'

// ... other code ...

app.use('/api/features', featureRoutes)
```

### Code Style Guidelines

#### TypeScript/JavaScript

```typescript
// ✅ Good
const getUserById = async (id: string): Promise<User> => {
  return apiClient.get<User>(`/users/${id}`)
}

// ❌ Bad
const getUserById = async (id) => {
  return fetch(`/users/${id}`).then(r => r.json())
}
```

#### Error Handling

```typescript
// ✅ Good - Frontend
try {
  const data = await userService.getAll()
  setUsers(data)
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.message)
  }
}

// ✅ Good - Backend
export const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getById(req.params.id)
  
  if (!user) {
    throw new NotFoundError('User not found')
  }
  
  return ApiResponse.success(res, user)
})
```

#### Logging

```javascript
// ✅ Good
logger.info('User login attempt', { username })
logger.error('Database error', error, { query })

// ❌ Bad
console.log('User login')
console.error(error)
```

## Testing

### Frontend Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test -- --watch
```

### Backend Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm test -- --coverage
```

## Debugging

### Frontend Debugging

1. **Browser DevTools**
   - Network tab for API calls
   - Console for errors
   - React DevTools for component state

2. **VS Code Debugging**
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Next.js: debug client-side",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/frontend"
}
```

### Backend Debugging

1. **Console Logging**
```javascript
logger.debug('Debug info', { data })
```

2. **VS Code Debugging**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "program": "${workspaceFolder}/backend/src/server.js",
  "env": {
    "NODE_ENV": "development"
  }
}
```

## Common Issues

### Frontend

**Issue: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue: API calls failing**
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Verify backend is running
- Check browser console for errors

### Backend

**Issue: Database connection failed**
- Verify PostgreSQL is running
- Check `.env` database credentials
- Test connection: `psql -U postgres -d winform_db`

**Issue: Port already in use**
```bash
# Find and kill process
lsof -ti:3001 | xargs kill -9
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

## Performance Tips

### Frontend
- Use dynamic imports for large components
- Implement pagination for large lists
- Use React.memo for expensive components
- Optimize images with Next.js Image component

### Backend
- Use database indexes
- Implement query result caching
- Use connection pooling
- Optimize database queries

---

**Last Updated:** 2026-04-26  
**Version:** 1.0.0
