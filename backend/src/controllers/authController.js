import { authService } from '../services/authService.js'
import { ApiResponse } from '../utils/response.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const authController = {
  /**
   * Login user
   */
  login: asyncHandler(async (req, res) => {
    const { username, password, accountingMonth, workDate } = req.body

    const result = await authService.login(username, password, accountingMonth, workDate)

    return ApiResponse.success(res, result, 'Đăng nhập thành công')
  }),

  /**
   * Get current user profile
   */
  getProfile: asyncHandler(async (req, res) => {
    const username = req.user.username
    const user = await authService.getProfile(username)

    return ApiResponse.success(res, user)
  }),

  /**
   * Logout user
   */
  logout: asyncHandler(async (req, res) => {
    return ApiResponse.success(res, null, 'Đăng xuất thành công')
  }),
}
