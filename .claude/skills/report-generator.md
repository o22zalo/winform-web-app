---
name: report-generator
description: Generate a report page with filters and export functionality
---

# Report Generator Skill

Generates a complete report page (Template T5) with filters and export.

## Usage

```
/report-generator <name> <filters> <columns>
```

**Parameters:**
- `name`: Report name (kebab-case)
- `filters`: Filter types (period, customer, product, status)
- `columns`: Grid column definitions

**Examples:**
```
/report-generator doanh-thu-theo-khach period,customer ma:Mã KH,ten:Tên KH,tongTien:Tổng tiền,soLuong:Số lượng

/report-generator ton-kho period,product ma:Mã hàng,ten:Tên hàng,tonDau:Tồn đầu,nhap:Nhập,xuat:Xuất,tonCuoi:Tồn cuối
```

## What it does

1. Creates report page with Template T5
2. Adds ReportFilter component
3. Configures AG Grid columns
4. Implements PrintExportBar
5. Adds export to Excel function
6. Adds export to PDF function
7. Adds print function
8. Sets up data fetching with filters

## Report Features

- Period filters (day, week, month, quarter, year, custom)
- Additional filters based on parameters
- Sortable/filterable grid
- Export to Excel (XLSX)
- Export to PDF
- Print preview
- Summary row (optional)
- Grouping (optional)

## Output Files

- `app/(main)/bao-cao/{name}/page.tsx` - Report page
- `lib/api/use{Name}Report.ts` - API hook
- Export utility functions if needed

## Export Functions

### Excel Export
Uses SheetJS (xlsx) to generate Excel files with:
- Formatted headers
- Number formatting
- Date formatting
- Auto column width

### PDF Export
Uses @react-pdf/renderer to generate PDFs with:
- Company header
- Report title and filters
- Formatted table
- Page numbers

### Print
Opens browser print dialog with:
- Print-optimized CSS
- Page breaks
- Headers/footers
