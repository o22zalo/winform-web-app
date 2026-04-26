import jwt from 'jsonwebtoken'
import { authRepository } from '../repositories/authRepository.js'
import { eventBus } from '../events/eventBus.js'
import { AuthenticationError, ValidationError } from '../utils/errors.js'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

export const authService = {
  /**
   * Login user with username and password
   * Validates against current.dmnhanvien table with MD5 password
   */
  async login(username, password, accountingMonth, workDate) {
    if (!username || !password) {
      throw new ValidationError('Tên đăng nhập và mật khẩu là bắt buộc')
    }

    logger.info('Login attempt', { username })

    // Find user in database with MD5 password check
    const result = await authRepository.findByUsername(username, password)

    if (result.rows.length === 0) {
      logger.warn('Login failed - invalid credentials', { username })
      throw new AuthenticationError('Tên đăng nhập hoặc mật khẩu không đúng')
    }

    const user = result.rows[0]

    // Generate JWT token with additional fields
    const token = jwt.sign(
      {
        username: user.taikhoan,
        name: user.hoten,
        accountingMonth: accountingMonth || new Date().toISOString().slice(0, 7),
        workDate: workDate || new Date().toISOString().slice(0, 10),
      },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    )

    // Emit event
    await eventBus.emit('auth.user_logged_in', {
      username: user.taikhoan,
      accountingMonth,
      workDate,
      timestamp: new Date(),
    })

    logger.info('Login successful', { username })

    return {
      token,
      user: {
        username: user.taikhoan,
        fullName: user.hoten,
        email: user.email,
        accountingMonth: accountingMonth || new Date().toISOString().slice(0, 7),
        workDate: workDate || new Date().toISOString().slice(0, 10),
      },
    }
  },

  /**
   * Get user profile
   */
  async getProfile(username) {
    const result = await authRepository.findByUsernameOnly(username)

    if (result.rows.length === 0) {
      throw new AuthenticationError('Người dùng không tồn tại')
    }

    const user = result.rows[0]

    return {
      username: user.taikhoan,
      fullName: user.hoten,
      email: user.email,
    }
  },
}
