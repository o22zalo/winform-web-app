// Global TypeScript types

export interface HangHoa {
  id: string
  ma: string
  ten: string
  dvt: string
  giaBan: number
  tonKho: number
  nhomHangId?: string
  moTa?: string
  trangThai: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface KhachHang {
  id: string
  ma: string
  ten: string
  dienThoai?: string
  email?: string
  diaChi?: string
  maSoThue?: string
  loaiKhach: 'retail' | 'wholesale'
  congNo: number
  trangThai: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface NhaCungCap {
  id: string
  ma: string
  ten: string
  dienThoai?: string
  email?: string
  diaChi?: string
  maSoThue?: string
  congNo: number
  trangThai: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface DonHang {
  id: string
  soDon: string
  ngayDat: Date
  khachHangId: string
  khachHang?: KhachHang
  tongTien: number
  giamGia: number
  thanhTien: number
  trangThai: 'draft' | 'confirmed' | 'completed' | 'cancelled'
  ghiChu?: string
  chiTiet: DonHangChiTiet[]
  createdAt: Date
  updatedAt: Date
}

export interface DonHangChiTiet {
  id: string
  donHangId: string
  hangHoaId: string
  hangHoa?: HangHoa
  soLuong: number
  donGia: number
  giamGia: number
  thanhTien: number
}

export interface PhieuNhap {
  id: string
  soPhieu: string
  ngayNhap: Date
  nhaCungCapId: string
  nhaCungCap?: NhaCungCap
  tongTien: number
  trangThai: 'draft' | 'completed'
  ghiChu?: string
  chiTiet: PhieuNhapChiTiet[]
  createdAt: Date
  updatedAt: Date
}

export interface PhieuNhapChiTiet {
  id: string
  phieuNhapId: string
  hangHoaId: string
  hangHoa?: HangHoa
  soLuong: number
  donGia: number
  thanhTien: number
}

export interface PhieuXuat {
  id: string
  soPhieu: string
  ngayXuat: Date
  khachHangId?: string
  khachHang?: KhachHang
  tongTien: number
  trangThai: 'draft' | 'completed'
  ghiChu?: string
  chiTiet: PhieuXuatChiTiet[]
  createdAt: Date
  updatedAt: Date
}

export interface PhieuXuatChiTiet {
  id: string
  phieuXuatId: string
  hangHoaId: string
  hangHoa?: HangHoa
  soLuong: number
  donGia: number
  thanhTien: number
}

export interface User {
  id: string
  username: string
  email: string
  hoTen: string
  role: 'admin' | 'user' | 'viewer'
  trangThai: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface TabItem {
  id: string
  title: string
  icon?: string
  path: string
  closable: boolean
  isDirty?: boolean
}

export interface MenuItem {
  id: string
  label: string
  icon?: string
  path?: string
  children?: MenuItem[]
}

export interface ReportFilter {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom'
  fromDate?: Date
  toDate?: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface HangHoaDto {
  id: string
  ma: string
  ten: string
  dvt: string
  giaBan: number
  tonKho: number
  nhomHangId?: string
  moTa?: string
  trangThai: 'active' | 'inactive'
  createdAt?: Date
  updatedAt?: Date
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: {
      username: string
      hoTen: string
      email?: string
    }
    token: string
  }
}
