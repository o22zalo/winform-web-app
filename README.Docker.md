# Docker Deployment Guide

## Yêu cầu
- Docker
- Docker Compose
- PostgreSQL đã cài đặt trên host machine

## Cấu trúc
- **Backend**: Node.js API server (port 3001)
- **Frontend**: Next.js application (port 3000)

## Cấu hình

### 1. Tạo file .env
Copy file `.env.example` thành `.env` và cập nhật thông tin:
```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin database của bạn:
```
DB_HOST=host.docker.internal
DB_PORT=5432
DB_NAME=winform_db
DB_USER=postgres
DB_PASSWORD=your_actual_password
JWT_SECRET=your-secret-key-change-in-production
```

## Khởi chạy

### 1. Build và chạy tất cả services
```bash
docker-compose up -d
```

### 2. Xem logs
```bash
# Tất cả services
docker-compose logs -f

# Chỉ backend
docker-compose logs -f backend

# Chỉ frontend
docker-compose logs -f frontend
```

### 3. Dừng services
```bash
docker-compose down
```

### 4. Dừng và xóa volumes (xóa database)
```bash
docker-compose down -v
```

## Cấu hình

### Thay đổi environment variables
Chỉnh sửa file `docker-compose.yml` trong phần `environment` của từng service.

### Thay đổi ports
Chỉnh sửa phần `ports` trong `docker-compose.yml`:
```yaml
ports:
  - "HOST_PORT:CONTAINER_PORT"
```

## Rebuild sau khi thay đổi code
```bash
docker-compose up -d --build
```

## Truy cập ứng dụng
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

## Production
Đối với production, nên:
1. Thay đổi `JWT_SECRET` và `POSTGRES_PASSWORD`
2. Sử dụng external database thay vì container
3. Cấu hình reverse proxy (nginx)
4. Enable SSL/TLS
