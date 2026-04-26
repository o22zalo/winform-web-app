/**
 * Validation Middleware
 * Handles express-validator validation results
 */

import { validationResult } from 'express-validator'
import { ValidationError } from '../utils/errors.js'

export function validate(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
      value: err.value,
    }))

    throw new ValidationError('Dữ liệu không hợp lệ', formattedErrors)
  }

  next()
}
