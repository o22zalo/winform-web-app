# System Architecture

## Tổng Quan

Winform Web App được xây dựng theo kiến trúc hiện đại với frontend Next.js và backend Node.js/Express, tuân thủ best practices và design patterns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js App Router (React 19 + TypeScript)           │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Pages      │  │  Components  │  │   Layouts   │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │           API Services Layer                      │ │ │
│  │  │  - auth.service.ts                               │ │ │
│  │  │  - product.service.ts                            │ │ │
│  │  │  - customer.service.ts                           │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │           API Client (HTTP)                       │ │ │
│  │  │  - Timeout handling                              │ │ │
│  │  │  - Error handling                                │ │ │
│  │  │  - JWT token injection                           │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            │
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Express Server (Node.js)                             │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Middleware Layer                                 │ │ │
│  │  │  - Request Logger                                 │ │ │
│  │  │  - Error Handler                                  │ │ │
│  │  │  - Auth Middleware                                │ │ │
│  │  │  - Validation                                     │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Routes → Controllers → Services → Repositories  │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQL
                            │
┌─────────────────────────────────────────────────────────────┐
│                      PostgreSQL                              │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Layer Structure

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Pages, Components, Layouts)           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         API Services Layer              │
│  (auth, product, customer, etc.)        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         HTTP Client Layer               │
│  (apiClient with error handling)        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Backend API                     │
└─────────────────────────────────────────┘
```

### Key Components

**1. API Client (`lib/apiClient.ts`)**
- Centralized HTTP client
- Automatic JWT token injection
- Request timeout handling
- Standardized error handling
- Development logging

**2. API Services (`lib/api/*.service.ts`)**
- Type-safe API calls
- Business logic encapsulation
- Consistent error handling
- Easy to test and maintain

**3. State Management**
- Zustand for global state
- TanStack Query for server state
- Local state with React hooks

**4. Components**
- Reusable UI components
- Feature-specific modules
- Layout components
- Common utilities

## Backend Architecture

### Layer Structure

```
┌─────────────────────────────────────────┐
│         Routes Layer                    │
│  (API endpoints + validation)           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Controllers Layer               │
│  (Request/Response handling)            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Services Layer                  │
│  (Business logic)                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Repositories Layer              │
│  (Database access)                      │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Database                        │
└─────────────────────────────────────────┘
```

### Key Components

**1. Middleware System**
- `errorHandler.js` - Centralized error handling
- `requestLogger.js` - Request/Response logging
- `authMiddleware.js` - JWT authentication
- `validate.js` - Input validation

**2. Error Handling**
- Custom error classes
- Standardized error responses
- Comprehensive logging
- Development vs Production modes

**3. Logging System**
- Multiple log levels (error, warn, info, debug)
- Colored console output
- Request timing
- Structured logging

**4. Response Format**
- Standardized API responses
- Success/Error formats
- Pagination support

## Data Flow

### Request Flow (Frontend → Backend)

```
1. User Action
   ↓
2. Component calls API Service
   ↓
3. API Service uses apiClient
   ↓
4. apiClient adds JWT token & sends HTTP request
   ↓
5. Backend receives request
   ↓
6. Middleware: Request Logger
   ↓
7. Middleware: Auth Verification (if protected)
   ↓
8. Middleware: Input Validation
   ↓
9. Route → Controller
   ↓
10. Controller → Service
   ↓
11. Service → Repository
   ↓
12. Repository → Database
   ↓
13. Response flows back up
   ↓
14. Middleware: Error Handler (if error)
   ↓
15. Response sent to frontend
   ↓
16. apiClient handles response/error
   ↓
17. API Service returns typed data
   ↓
18. Component updates UI
```

## Security

### Frontend
- JWT token stored in localStorage
- Automatic token injection in requests
- Protected routes with middleware
- XSS protection via React
- HTTPS in production

### Backend
- JWT authentication
- Helmet for security headers
- CORS configuration
- Input validation
- SQL injection prevention
- Rate limiting (recommended)

## Performance

### Frontend
- Code splitting with Next.js
- Dynamic imports for modules
- Image optimization
- PWA support
- Client-side caching with TanStack Query

### Backend
- Compression middleware
- Database connection pooling
- Efficient queries
- Response caching (recommended)

## Scalability

### Horizontal Scaling
- Stateless backend (JWT)
- Load balancer ready
- Database connection pooling
- CDN for static assets

### Vertical Scaling
- Efficient queries
- Indexed database
- Optimized bundle size
- Lazy loading

## Monitoring & Logging

### Frontend
- Error boundaries
- Console logging (dev mode)
- Performance monitoring (recommended)

### Backend
- Request/Response logging
- Error logging with stack traces
- Performance metrics
- Health check endpoint

## Design Patterns

### Frontend
- **Service Pattern** - API services encapsulate HTTP calls
- **Repository Pattern** - Data access abstraction
- **Observer Pattern** - State management with Zustand
- **Component Pattern** - Reusable UI components

### Backend
- **Layered Architecture** - Separation of concerns
- **Repository Pattern** - Database abstraction
- **Middleware Pattern** - Request processing pipeline
- **Factory Pattern** - Error creation
- **Singleton Pattern** - Database connection

## Best Practices

### Frontend
1. Always use API services, never fetch directly
2. Type-safe code with TypeScript
3. Error handling at service level
4. Consistent component structure
5. Reusable components

### Backend
1. Layered architecture
2. Centralized error handling
3. Input validation at routes
4. Logging for all operations
5. Standardized responses

## Future Improvements

### Recommended
- [ ] Add API rate limiting
- [ ] Implement refresh token
- [ ] Add request caching
- [ ] Setup monitoring (Sentry, DataDog)
- [ ] Add automated tests
- [ ] API documentation (Swagger)
- [ ] Database migrations
- [ ] CI/CD pipeline

---

**Last Updated:** 2026-04-26  
**Version:** 1.0.0
