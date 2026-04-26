---
name: CrudToolbar Layout Standard
description: CrudToolbar must be placed at bottom of all modules with centered buttons and extended features
type: feedback
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
All module forms must follow this CrudToolbar layout pattern:

1. **Position**: CrudToolbar always at bottom of module (after grid/content area)
2. **Button alignment**: All buttons centered using `justifyContent: 'center'`
3. **Required buttons**: Add, Edit, Delete, Print (In), Export Excel (Xuất Excel)
4. **Extensible menu**: Additional menu with MoreVertical icon for future features
5. **Search field**: Included in toolbar

**Why:** User explicitly requested this layout for consistency across all forms. Previous top-positioned toolbar was removed in favor of bottom placement with centered buttons.

**How to apply:** When creating or modifying any module component:
- Place `<CrudToolbar />` as last child before closing dialogs
- Grid/content area gets `flex: 1, overflow: 'auto'` 
- Always include: `onPrint`, `onExportExcel`, `additionalMenuItems` props
- Standard additionalMenuItems: 'Nhập từ Excel', 'Sao chép'

**Example structure:**
```tsx
<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
  <PageHeader title="..." />
  <Box sx={{ flex: 1, p: 1, overflow: 'auto' }}>
    <AppGrid ... />
  </Box>
  <CrudToolbar
    onAdd={...}
    onEdit={...}
    onDelete={...}
    onPrint={() => console.log('In')}
    onExportExcel={() => console.log('Xuất Excel')}
    additionalMenuItems={[
      { label: 'Nhập từ Excel', onClick: () => console.log('Nhập Excel') },
      { label: 'Sao chép', onClick: () => console.log('Sao chép') },
    ]}
    editDisabled={!selected}
    deleteDisabled={!selected}
    searchValue={searchValue}
    onSearchChange={setSearchValue}
  />
  {/* Dialogs */}
</Box>
```
