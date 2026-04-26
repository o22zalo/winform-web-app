// TanStack Query keys constants

export const QUERY_KEYS = {
  // Danh mục
  HANG_HOA: 'hang-hoa',
  HANG_HOA_LIST: ['hang-hoa', 'list'],
  HANG_HOA_DETAIL: (id: string) => ['hang-hoa', 'detail', id],

  KHACH_HANG: 'khach-hang',
  KHACH_HANG_LIST: ['khach-hang', 'list'],
  KHACH_HANG_DETAIL: (id: string) => ['khach-hang', 'detail', id],

  NHA_CUNG_CAP: 'nha-cung-cap',
  NHA_CUNG_CAP_LIST: ['nha-cung-cap', 'list'],
  NHA_CUNG_CAP_DETAIL: (id: string) => ['nha-cung-cap', 'detail', id],

  // Giao dịch
  DON_HANG: 'don-hang',
  DON_HANG_LIST: ['don-hang', 'list'],
  DON_HANG_DETAIL: (id: string) => ['don-hang', 'detail', id],

  PHIEU_NHAP: 'phieu-nhap',
  PHIEU_NHAP_LIST: ['phieu-nhap', 'list'],
  PHIEU_NHAP_DETAIL: (id: string) => ['phieu-nhap', 'detail', id],

  PHIEU_XUAT: 'phieu-xuat',
  PHIEU_XUAT_LIST: ['phieu-xuat', 'list'],
  PHIEU_XUAT_DETAIL: (id: string) => ['phieu-xuat', 'detail', id],

  // Báo cáo
  BAO_CAO_TONG_HOP: 'bao-cao-tong-hop',
  BAO_CAO_CHI_TIET: 'bao-cao-chi-tiet',

  // Quản trị
  USERS: 'users',
  USER_LIST: ['users', 'list'],
  USER_DETAIL: (id: string) => ['users', 'detail', id],
} as const
