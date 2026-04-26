/**
 * Logger Utility
 * Centralized logging with different levels
 */

import { env, isDevelopment } from '../config/env.js'

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

const COLORS = {
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[36m',
  debug: '\x1b[90m',
  reset: '\x1b[0m',
}

class Logger {
  constructor() {
    this.level = LOG_LEVELS[env.logging.level] || LOG_LEVELS.info
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString()
    const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`
  }

  log(level, message, meta = {}) {
    if (LOG_LEVELS[level] > this.level) return

    const formattedMessage = this.formatMessage(level, message, meta)

    if (env.logging.enableConsole) {
      const color = COLORS[level] || COLORS.reset
      console.log(`${color}${formattedMessage}${COLORS.reset}`)
    }

    // File logging can be added here if needed
  }

  error(message, error = null, meta = {}) {
    const errorMeta = error
      ? {
          ...meta,
          error: {
            message: error.message,
            stack: isDevelopment() ? error.stack : undefined,
            code: error.code,
          },
        }
      : meta

    this.log('error', message, errorMeta)
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta)
  }

  info(message, meta = {}) {
    this.log('info', message, meta)
  }

  debug(message, meta = {}) {
    this.log('debug', message, meta)
  }

  // Request logging
  request(req, res, duration) {
    const meta = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    }

    if (res.statusCode >= 500) {
      this.error('Request failed', null, meta)
    } else if (res.statusCode >= 400) {
      this.warn('Request error', meta)
    } else {
      this.info('Request completed', meta)
    }
  }
}

export const logger = new Logger()
