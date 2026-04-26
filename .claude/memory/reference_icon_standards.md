---
name: Icon Standards
description: Standardized icon usage across the entire project for consistency
type: reference
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
All components must use consistent icons from `lucide-react` library. Follow this standard mapping:

## CRUD Operations
- **Thêm (Add)**: `Plus` - Creating new records
- **Sửa (Edit)**: `Pencil` - Editing existing records
- **Xóa (Delete)**: `Trash2` - Deleting records
- **Lưu (Save)**: `Save` - Saving changes
- **Hủy (Cancel)**: `X` - Canceling operations
- **Làm mới (Refresh)**: `RefreshCw` - Reloading data

## Navigation
- **Trước (Previous)**: `ChevronLeft` - Previous page/record
- **Sau (Next)**: `ChevronRight` - Next page/record
- **Đầu (First)**: `ChevronsLeft` - First page
- **Cuối (Last)**: `ChevronsRight` - Last page
- **Mở rộng (Expand)**: `ChevronDown` - Expand accordion/dropdown
- **Thu gọn (Collapse)**: `ChevronUp` - Collapse accordion/dropdown

## File Operations
- **In (Print)**: `Printer` - Print documents
- **Xuất Excel (Export Excel)**: `FileSpreadsheet` - Export to Excel
- **Nhập Excel (Import Excel)**: `FileUp` - Import from Excel
- **Tải xuống (Download)**: `Download` - Download files
- **Tải lên (Upload)**: `Upload` - Upload files
- **File**: `File` - Generic file icon
- **PDF**: `FileText` - PDF documents

## Search & Filter
- **Tìm kiếm (Search)**: `Search` - Search functionality
- **Lọc (Filter)**: `Filter` - Filter data
- **Sắp xếp (Sort)**: `ArrowUpDown` - Sort columns

## Menu & Layout
- **Menu chính (Main Menu)**: `Menu` - Hamburger menu (mobile)
- **Đóng menu (Close Menu)**: `X` - Close menu/dialog
- **Thêm menu (More Options)**: `MoreVertical` - Additional menu items (3 dots vertical)
- **Thêm menu ngang (More Horizontal)**: `MoreHorizontal` - Additional menu items (3 dots horizontal)
- **Sidebar mở (Sidebar Open)**: `PanelLeftOpen` - Expand sidebar
- **Sidebar đóng (Sidebar Close)**: `PanelLeftClose` - Collapse sidebar

## Module/Category Icons
- **Thư mục (Folder)**: `FolderOpen` - Folders, categories, modules
- **Thư mục đóng (Folder Closed)**: `Folder` - Closed folders
- **Nhóm (Group)**: `Layers` - Grouping items
- **Danh mục (Category)**: `List` - Lists, categories

## User & Account
- **Người dùng (User)**: `User` - User profile
- **Nhiều người dùng (Users)**: `Users` - Multiple users
- **Đăng nhập (Login)**: `LogIn` - Login action
- **Đăng xuất (Logout)**: `LogOut` - Logout action
- **Khóa (Lock)**: `Lock` - Locked/secured
- **Mở khóa (Unlock)**: `Unlock` - Unlocked

## Theme & Settings
- **Chế độ sáng (Light Mode)**: `Sun` - Light theme
- **Chế độ tối (Dark Mode)**: `Moon` - Dark theme
- **Cài đặt (Settings)**: `Settings` - Settings/configuration
- **Công cụ (Tools)**: `Wrench` - Tools/utilities

## Status & Notifications
- **Thành công (Success)**: `CheckCircle` - Success state
- **Lỗi (Error)**: `XCircle` - Error state
- **Cảnh báo (Warning)**: `AlertTriangle` - Warning state
- **Thông tin (Info)**: `Info` - Information
- **Trợ giúp (Help)**: `HelpCircle` - Help/support

## Medical/Hospital Specific
- **Bệnh nhân (Patient)**: `User` - Patient records
- **Bác sĩ (Doctor)**: `Stethoscope` - Doctors (if available, else `UserCheck`)
- **Khoa phòng (Department)**: `Building` - Hospital departments
- **Giường bệnh (Bed)**: `Bed` - Hospital beds (if available, else `Home`)
- **Lịch hẹn (Appointment)**: `Calendar` - Appointments
- **Đơn thuốc (Prescription)**: `Pill` - Prescriptions (if available, else `FileText`)

## Data & Reports
- **Báo cáo (Report)**: `BarChart` - Reports/analytics
- **Thống kê (Statistics)**: `PieChart` - Statistics
- **Biểu đồ (Chart)**: `LineChart` - Charts/graphs
- **Bảng (Table)**: `Table` - Data tables
- **Sao chép (Copy)**: `Copy` - Copy data

## Actions
- **Xem (View)**: `Eye` - View details
- **Ẩn (Hide)**: `EyeOff` - Hide content
- **Chỉnh sửa (Edit)**: `Edit` - Edit mode
- **Kiểm tra (Check)**: `Check` - Verify/check
- **Đóng (Close)**: `X` - Close dialog/window

## Import Usage
```tsx
import { 
  Plus, Pencil, Trash2, Save, X, 
  ChevronLeft, ChevronRight, ChevronDown,
  Printer, FileSpreadsheet, Search,
  Menu, MoreVertical, FolderOpen,
  User, LogOut, Sun, Moon,
  PanelLeftOpen, PanelLeftClose
} from 'lucide-react'
```

## Size Standards
- **Toolbar buttons**: `size={16}` - Standard toolbar icons
- **Sidebar icons**: `size={20}` - Sidebar navigation icons
- **Large buttons**: `size={24}` - Prominent action buttons
- **Small indicators**: `size={14}` - Small status indicators

**Why:** Consistent icon usage improves UX, makes the interface intuitive, and maintains visual harmony across all modules.

**How to apply:** Always reference this standard when adding new features or icons. Never use different icons for the same action across different modules.
