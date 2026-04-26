---
name: migration-helper
description: Help migrate a WinForms form to web equivalent
---

# Migration Helper Skill

Assists in migrating WinForms forms to web app equivalents.

## Usage

```
/migration-helper <form-description>
```

**Parameters:**
- `form-description`: Description of the WinForms form or paste form structure

**Examples:**
```
/migration-helper "Form có DataGridView với các cột Mã, Tên, Giá. Có nút Thêm, Sửa, Xóa. Double-click để edit."

/migration-helper "Form master-detail: Trên là thông tin đơn hàng, dưới là grid chi tiết có thể edit inline. Có nút Lưu, Hủy, In."
```

## What it does

1. Analyzes WinForms form structure
2. Identifies appropriate template (T1-T5)
3. Maps WinForms controls to web components
4. Suggests component structure
5. Provides migration checklist
6. Generates initial code

## Control Mapping

### WinForms → Web Components

| WinForms | Web Equivalent |
|----------|----------------|
| DataGridView | AppGrid (AG Grid) |
| TextBox | TextField (MUI) |
| ComboBox | Select (MUI) |
| DateTimePicker | TextField type="date" |
| Button | Button (MUI) |
| CheckBox | Checkbox (MUI) |
| RadioButton | Radio (MUI) |
| GroupBox | Box with border |
| TabControl | Tabs (MUI) |
| MenuStrip | TopNavBar menu |
| ToolStrip | CrudToolbar |
| StatusStrip | StatusBar |
| SplitContainer | Box with flex |

## Migration Checklist

- [ ] Identify template type
- [ ] Map all controls
- [ ] Convert data binding to React state
- [ ] Convert events to handlers
- [ ] Add validation (Zod)
- [ ] Setup API calls (TanStack Query)
- [ ] Add loading states
- [ ] Add error handling
- [ ] Test keyboard shortcuts
- [ ] Test tab order

## Output

1. Recommended template
2. Component structure
3. Initial code scaffold
4. Migration notes
5. Testing checklist
