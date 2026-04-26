---
name: Sidebar Full Height Layout
description: Sidebar must always fill full height with controls fixed at bottom
type: feedback
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
Sidebar must use flexbox to ensure full height coverage with three distinct sections:

1. **Top section** (fixed height): Date/time display with border-bottom
2. **Middle section** (flex: 1, scrollable): Navigation menus (Accordion components)
3. **Bottom section** (fixed height, flexShrink: 0): User controls with border-top

**Why:** User explicitly required sidebar to fill full height whether collapsed or expanded, with account/theme/logout controls always anchored at bottom. Middle menu area should expand/scroll as needed.

**How to apply:**
```tsx
<Box sx={{ 
  display: 'flex', 
  flexDirection: 'column', 
  height: '100%',
  width: isMobile ? '100%' : (sidebarCollapsed ? '60px' : '250px')
}}>
  {/* Top: Date/time */}
  <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
    {(!sidebarCollapsed || isMobile) && (/* date/time content */)}
  </Box>

  {/* Middle: Scrollable menus */}
  <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
    {/* Accordion menus */}
  </Box>

  {/* Bottom: Fixed controls */}
  <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
    <Stack spacing={0.5}>
      {/* Collapse, theme toggle, account, logout buttons */}
    </Stack>
  </Box>
</Box>
```

Key CSS properties:
- Parent: `display: flex, flexDirection: column, height: 100%`
- Middle: `flex: 1, overflow: auto, minHeight: 0`
- Bottom: `flexShrink: 0`
