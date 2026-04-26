import express from 'express'
import { body } from 'express-validator'
import { authController } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username là bắt buộc'),
    body('password').notEmpty().withMessage('Password là bắt buộc'),
    body('accountingMonth').optional().isString(),
    body('workDate').optional().isString(),
  ],
  validate,
  authController.login
)

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', authMiddleware, authController.logout)

/**
 * GET /api/auth/profile
 * Get current user profile
 */
router.get('/profile', authMiddleware, authController.getProfile)

export default router
