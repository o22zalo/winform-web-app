---
name: Remove PageHeader from Modules
description: All module forms must not use PageHeader component - remove it completely
type: feedback
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
Do not use PageHeader component in any module forms. The tab title already shows the module name, so the PageHeader is redundant.

**Why:** User explicitly requested to remove the PageHeader div from all forms as it duplicates the tab title and wastes vertical space.

**How to apply:** When creating or modifying module components:
- Remove `<PageHeader title="..." />` line completely
- Remove PageHeader import if not used elsewhere
- Grid/content area should start immediately after the container Box

**Before:**
```tsx
return (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <PageHeader title="Quản lý người dùng" />
    <Box sx={{ flex: 1, p: 1, overflow: 'auto' }}>
      <AppGrid ... />
    </Box>
    <CrudToolbar ... />
  </Box>
)
```

**After:**
```tsx
return (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ flex: 1, p: 1, overflow: 'auto' }}>
      <AppGrid ... />
    </Box>
    <CrudToolbar ... />
  </Box>
)
```
