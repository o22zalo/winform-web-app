import { dbQuery } from '../config/database.js'
import { DatabaseError } from '../utils/errors.js'
import { logger } from '../utils/logger.js'

export const authRepository = {
  /**
   * Find user by username and password (MD5 hashed)
   */
  async findByUsername(username, password) {
    try {
      return await dbQuery(
        `SELECT taikhoan, holot||' '||ten AS hoten, email
         FROM current.dmnhanvien
         WHERE taikhoan = $1 AND matkhau = md5($2)`,
        [username, password]
      )
    } catch (error) {
      logger.error('Database error in findByUsername', error)
      throw new DatabaseError('Lỗi truy vấn cơ sở dữ liệu', error)
    }
  },

  /**
   * Find user by username only (for profile lookup)
   */
  async findByUsernameOnly(username) {
    try {
      return await dbQuery(
        `SELECT taikhoan, holot||' '||ten AS hoten, email
         FROM current.dmnhanvien
         WHERE taikhoan = $1`,
        [username]
      )
    } catch (error) {
      logger.error('Database error in findByUsernameOnly', error)
      throw new DatabaseError('Lỗi truy vấn cơ sở dữ liệu', error)
    }
  },
}
