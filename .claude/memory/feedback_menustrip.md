---
name: Windows Form MenuStrip
description: Top navigation must use Windows Form style MenuStrip with dropdown menus instead of horizontal buttons
type: feedback
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
Top navigation bar must follow Windows Form MenuStrip pattern with dropdown menus.

**Removed:** Horizontal button menu with individual module buttons
**Replaced with:** MenuStrip component with menu labels and dropdown items

**Why:** User explicitly requested to remove the horizontal button menu ("Hospital Management System, Hệ thống, Quản trị người dùng, Khai báo số liệu...") and replace with Windows Form style MenuStrip.

**How to apply:**

MenuStrip structure:
```tsx
const menuItems = [
  { label: 'Hệ thống', items: ['Đăng nhập', 'Đăng xuất', 'Đổi mật khẩu'] },
  { label: 'Danh mục', items: ['Người dùng', 'Khoa phòng', 'Bệnh nhân'] },
  { label: 'Báo cáo', items: ['Báo cáo tổng hợp', 'Thống kê'] },
]

<Box sx={{ display: 'flex', borderBottom: '1px solid', borderColor: 'divider', minHeight: '32px' }}>
  {menuItems.map((menu) => (
    <Box key={menu.label}>
      <Box onClick={(e) => handleMenuOpen(e, menu.label)} sx={{ px: 2, py: 0.5, cursor: 'pointer' }}>
        <Typography sx={{ fontSize: 13 }}>{menu.label}</Typography>
      </Box>
      <Menu anchorEl={anchorEl} open={activeMenu === menu.label} onClose={handleMenuClose}>
        {menu.items.map((item) => (
          <MenuItem key={item} onClick={handleMenuClose}>{item}</MenuItem>
        ))}
      </Menu>
    </Box>
  ))}
</Box>
```

TopNavBar.tsx should only render MenuStrip component, nothing else.
