/**
 * Environment Configuration
 * Centralized environment variables with validation
 */

import dotenv from 'dotenv'

dotenv.config()

function getEnvVar(key, defaultValue) {
  return process.env[key] || defaultValue
}

function getEnvNumber(key, defaultValue) {
  const value = process.env[key]
  return value ? parseInt(value, 10) : defaultValue
}

function getEnvBoolean(key, defaultValue) {
  const value = process.env[key]
  return value ? value === 'true' : defaultValue
}

export const env = {
  // Server
  port: getEnvNumber('PORT', 3001),
  nodeEnv: getEnvVar('NODE_ENV', 'development'),

  // Database
  database: {
    host: getEnvVar('DB_HOST', 'localhost'),
    port: getEnvNumber('DB_PORT', 5432),
    name: getEnvVar('DB_NAME', 'winform_db'),
    user: getEnvVar('DB_USER', 'postgres'),
    password: getEnvVar('DB_PASSWORD', ''),
    maxConnections: getEnvNumber('DB_MAX_CONNECTIONS', 20),
  },

  // JWT
  jwt: {
    secret: getEnvVar('JWT_SECRET', 'your-secret-key-change-in-production'),
    expiresIn: getEnvVar('JWT_EXPIRES_IN', '24h'),
  },

  // CORS
  cors: {
    origin: getEnvVar('CORS_ORIGIN', 'http://localhost:3000'),
  },

  // Logging
  logging: {
    level: getEnvVar('LOG_LEVEL', 'info'),
    enableConsole: getEnvBoolean('LOG_CONSOLE', true),
    enableFile: getEnvBoolean('LOG_FILE', false),
  },
}

export function isDevelopment() {
  return env.nodeEnv === 'development'
}

export function isProduction() {
  return env.nodeEnv === 'production'
}

export function isTest() {
  return env.nodeEnv === 'test'
}
