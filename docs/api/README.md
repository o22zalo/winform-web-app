# API Reference

## Base URL

```
Development: http://localhost:3001/api
Production: https://your-domain.com/api
```

## Authentication

Tất cả protected endpoints yêu cầu JWT token trong header:

```
Authorization: Bearer <token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "code": "ERROR_CODE",
  "errors": [
    // Validation errors (optional)
  ]
}
```

### Paginated Response

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 20,
      "totalPages": 5
    }
  }
}
```

## Endpoints

### Authentication

#### POST /auth/login

Login user và nhận JWT token.

**Request:**
```json
{
  "username": "admin",
  "password": "123456",
  "accountingMonth": "2026-04",
  "workDate": "2026-04-26"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "admin",
      "fullName": "Administrator",
      "email": "admin@example.com",
      "accountingMonth": "2026-04",
      "workDate": "2026-04-26"
    }
  }
}
```

**Errors:**
- `401` - Invalid credentials
- `400` - Validation error

---

#### POST /auth/logout

Logout user (protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

#### GET /auth/profile

Get current user profile (protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "username": "admin",
    "fullName": "Administrator",
    "email": "admin@example.com"
  }
}
```

**Errors:**
- `401` - Unauthorized

---

### Health Check

#### GET /health

Check server health status.

**Response:**
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2026-04-26T02:16:23.480Z",
  "environment": "development"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Input validation failed |
| `AUTHENTICATION_ERROR` | Authentication failed |
| `AUTHORIZATION_ERROR` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `CONFLICT` | Resource already exists |
| `DATABASE_ERROR` | Database operation failed |
| `INTERNAL_ERROR` | Internal server error |

## HTTP Status Codes

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `500` | Internal Server Error |

## Rate Limiting

Currently not implemented. Recommended for production.

## Versioning

API version is included in the base URL:
```
/api/v1/...  (future)
```

---

**Last Updated:** 2026-04-26  
**Version:** 1.0.0
