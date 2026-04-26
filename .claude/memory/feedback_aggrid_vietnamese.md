---
name: AG Grid Vietnamese Translation
description: All AG Grid UI elements must use comprehensive Vietnamese localeText
type: feedback
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
AG Grid components must include complete Vietnamese translation via localeText prop.

**Why:** User required all UI elements to be in Vietnamese for consistency across the hospital management system.

**How to apply:** Always include localeText prop in AgGridReact component with comprehensive translations:

```tsx
<AgGridReact<T>
  localeText={{
    // Pagination
    page: 'Trang',
    of: 'của',
    to: 'đến',
    more: 'thêm',
    next: 'Tiếp',
    last: 'Cuối',
    first: 'Đầu',
    previous: 'Trước',
    loadingOoo: 'Đang tải...',
    ariaPageSizeSelectorLabel: 'Kích thước trang',
    pageSizeSelectorLabel: 'Kích thước trang',
    
    // Selection
    selectAll: 'Chọn tất cả',
    searchOoo: 'Tìm kiếm...',
    blanks: 'Trống',
    noRowsToShow: 'Không có dữ liệu',
    
    // Filters
    filterOoo: 'Lọc...',
    equals: 'Bằng',
    notEqual: 'Không bằng',
    lessThan: 'Nhỏ hơn',
    greaterThan: 'Lớn hơn',
    lessThanOrEqual: 'Nhỏ hơn hoặc bằng',
    greaterThanOrEqual: 'Lớn hơn hoặc bằng',
    inRange: 'Trong khoảng',
    contains: 'Chứa',
    notContains: 'Không chứa',
    startsWith: 'Bắt đầu với',
    endsWith: 'Kết thúc với',
    andCondition: 'VÀ',
    orCondition: 'HOẶC',
    applyFilter: 'Áp dụng',
    resetFilter: 'Đặt lại',
    clearFilter: 'Xóa',
    
    // Column menu
    pinColumn: 'Ghim cột',
    autosizeThiscolumn: 'Tự động điều chỉnh cột này',
    autosizeAllColumns: 'Tự động điều chỉnh tất cả cột',
    groupBy: 'Nhóm theo',
    ungroupBy: 'Bỏ nhóm theo',
    resetColumns: 'Đặt lại cột',
    expandAll: 'Mở rộng tất cả',
    collapseAll: 'Thu gọn tất cả',
    copy: 'Sao chép',
    ctrlC: 'Ctrl+C',
    copyWithHeaders: 'Sao chép với tiêu đề',
    paste: 'Dán',
    ctrlV: 'Ctrl+V',
    export: 'Xuất',
    rowCount: 'Số dòng',
  }}
/>
```

This translation set covers pagination, filters, search, and all common grid operations.
