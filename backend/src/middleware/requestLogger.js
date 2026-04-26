/**
 * Request Logger Middleware
 * Logs all incoming requests with timing
 */

import { logger } from '../utils/logger.js'

export function requestLogger(req, res, next) {
  const startTime = Date.now()

  // Log request start
  logger.debug('Request started', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  })

  // Capture response finish
  res.on('finish', () => {
    const duration = Date.now() - startTime
    logger.request(req, res, duration)
  })

  next()
}
