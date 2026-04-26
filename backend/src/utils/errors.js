/**
 * Custom Error Classes
 * Standardized error types for the application
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', errors = null) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.errors = errors
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Dữ liệu không hợp lệ', errors = null) {
    super(message, 400, 'VALIDATION_ERROR', errors)
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Xác thực thất bại') {
    super(message, 401, 'AUTHENTICATION_ERROR')
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Không có quyền truy cập') {
    super(message, 403, 'AUTHORIZATION_ERROR')
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy tài nguyên') {
    super(message, 404, 'NOT_FOUND')
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Dữ liệu đã tồn tại') {
    super(message, 409, 'CONFLICT')
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Lỗi cơ sở dữ liệu', originalError = null) {
    super(message, 500, 'DATABASE_ERROR')
    this.originalError = originalError
  }
}
