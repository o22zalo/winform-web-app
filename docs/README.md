# Documentation Index

Chào mừng đến với tài liệu Winform Web App.

## 📚 Tài Liệu Chính

### [API Reference](./api/README.md)
Chi tiết về tất cả API endpoints, request/response formats, và error codes.

### [Architecture](./architecture/README.md)
Kiến trúc hệ thống, design patterns, và data flow.

### [Development Guide](./guides/DEVELOPMENT.md)
Hướng dẫn phát triển, code style, và best practices.

### [Deployment Guide](./guides/DEPLOYMENT.md)
Hướng dẫn deploy production, monitoring, và maintenance.

## 🚀 Quick Links

- **[Getting Started](../README.md#quick-start)** - Setup và chạy project
- **[Project Structure](../README.md#cấu-trúc-dự-án)** - Tổng quan cấu trúc
- **[Tech Stack](../README.md#tech-stack)** - Technologies được sử dụng

## 📖 Nội Dung Chi Tiết

### API Documentation
- [Authentication](./api/README.md#authentication)
- [Endpoints](./api/README.md#endpoints)
- [Error Codes](./api/README.md#error-codes)
- [Response Format](./api/README.md#response-format)

### Architecture
- [System Overview](./architecture/README.md#tổng-quan)
- [Frontend Architecture](./architecture/README.md#frontend-architecture)
- [Backend Architecture](./architecture/README.md#backend-architecture)
- [Data Flow](./architecture/README.md#data-flow)
- [Security](./architecture/README.md#security)

### Development
- [Setup Environment](./guides/DEVELOPMENT.md#setup-development-environment)
- [Project Structure](./guides/DEVELOPMENT.md#project-structure)
- [Adding Features](./guides/DEVELOPMENT.md#adding-a-new-feature)
- [Code Style](./guides/DEVELOPMENT.md#code-style-guidelines)
- [Debugging](./guides/DEVELOPMENT.md#debugging)

### Deployment
- [Production Checklist](./guides/DEPLOYMENT.md#production-checklist)
- [Frontend Deployment](./guides/DEPLOYMENT.md#frontend-deployment)
- [Backend Deployment](./guides/DEPLOYMENT.md#backend-deployment)
- [SSL Setup](./guides/DEPLOYMENT.md#sslhttps-setup)
- [Monitoring](./guides/DEPLOYMENT.md#monitoring)

## 🔧 Hướng Dẫn Nhanh

### Cài Đặt

```bash
# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd frontend
npm install
cp .env.example .env.local
```

### Chạy Development

```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)
cd frontend && npm run dev
```

### Build Production

```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm run build && npm start
```

## 📝 Quy Tắc Phát Triển

### Frontend
1. ✅ Luôn sử dụng API services, không gọi fetch trực tiếp
2. ✅ Type-safe code với TypeScript
3. ✅ Error handling ở service level
4. ✅ Reusable components
5. ✅ Consistent naming conventions

### Backend
1. ✅ Layered architecture (Routes → Controllers → Services → Repositories)
2. ✅ Centralized error handling
3. ✅ Input validation ở routes
4. ✅ Logging cho tất cả operations
5. ✅ Standardized responses

## 🐛 Troubleshooting

### Frontend Issues
- **Module not found**: `rm -rf node_modules .next && npm install`
- **API calls failing**: Check `.env.local` và backend status
- **Build errors**: Clear cache và rebuild

### Backend Issues
- **Database connection**: Verify credentials trong `.env`
- **Port in use**: `lsof -ti:3001 | xargs kill -9`
- **Server not starting**: Check logs với `LOG_LEVEL=debug`

## 📞 Support

Khi gặp vấn đề:
1. Check documentation này
2. Review error logs
3. Check [Development Guide](./guides/DEVELOPMENT.md#common-issues)
4. Contact team lead

## 🔄 Updates

Tài liệu này được cập nhật thường xuyên. Kiểm tra version và last updated date ở cuối mỗi file.

---

**Last Updated:** 2026-04-26  
**Version:** 1.0.0
