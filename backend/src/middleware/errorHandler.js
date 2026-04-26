/**
 * Error Handler Middleware
 * Centralized error handling with logging and standardized responses
 */

import { logger } from '../utils/logger.js'
import { AppError } from '../utils/errors.js'
import { isDevelopment } from '../config/env.js'

/**
 * Format error response
 */
function formatErrorResponse(err, includeStack = false) {
  const response = {
    success: false,
    message: err.message || 'Lỗi server',
    code: err.code || 'INTERNAL_ERROR',
  }

  if (err.errors) {
    response.errors = err.errors
  }

  if (includeStack && err.stack) {
    response.stack = err.stack
  }

  return response
}

/**
 * Error Handler Middleware
 */
export function errorHandler(err, req, res, next) {
  // Log error
  logger.error('Error occurred', err, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  })

  // Default to 500 if not an operational error
  const statusCode = err.statusCode || 500
  const isOperational = err.isOperational || false

  // Send response
  res.status(statusCode).json(formatErrorResponse(err, isDevelopment()))

  // If not operational error, it might be a programming error
  if (!isOperational) {
    logger.error('Non-operational error detected - possible programming error', err)
  }
}

/**
 * 404 Not Found Handler
 */
export function notFoundHandler(req, res, next) {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404, 'ROUTE_NOT_FOUND')
  next(error)
}

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

