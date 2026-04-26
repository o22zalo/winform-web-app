---
name: Mobile Responsive Pattern
description: Use MUI Drawer for mobile sidebar overlay, grid layout for desktop
type: feedback
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
Mobile and desktop layouts must be completely separated with different rendering patterns.

**Desktop (md and up):**
- CSS Grid with dynamic columns: `sidebarCollapsed ? '60px 1fr' : '250px 1fr'`
- Sidebar collapse button visible
- Sidebar width transitions between 60px (collapsed) and 250px (expanded)

**Mobile (below md breakpoint):**
- Hamburger menu icon (Menu/X toggle) in top bar
- MUI Drawer component for sidebar (overlay pattern)
- Drawer width: 250px
- Main content always full width (no grid columns)
- No collapse button in sidebar (not needed on mobile)

**Why:** Previous approach using grid columns with 0px width caused layout issues where both sidebar and main content disappeared. Drawer overlay pattern is the correct mobile UX and doesn't affect main content layout.

**How to apply:**
```tsx
const isMobile = useMediaQuery(theme.breakpoints.down('md'))
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

{isMobile ? (
  <>
    <Drawer anchor="left" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
      <SidebarExplorer />
    </Drawer>
    <TabWorkspace />
  </>
) : (
  <Box sx={{ display: 'grid', gridTemplateColumns: sidebarCollapsed ? '60px 1fr' : '250px 1fr' }}>
    <SidebarExplorer />
    <TabWorkspace />
  </Box>
)}
```

In SidebarExplorer, hide collapse button on mobile: `const showCollapseButton = !isMobile`
