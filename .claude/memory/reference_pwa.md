---
name: PWA Configuration
description: Progressive Web App setup for native app installation capability
type: reference
originSessionId: b42d8f1b-7e9e-4df4-9a2c-5c7b6d9bfba6
---
PWA is configured using next-pwa plugin to enable installation as native app on mobile and desktop.

**Configuration files:**

1. **next.config.ts** - PWA plugin setup
```typescript
import withPWA from 'next-pwa'
export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)
```

2. **public/manifest.json** - App manifest
```json
{
  "name": "Hospital Management System",
  "short_name": "HMS",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1a6fc4",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

3. **src/app/layout.tsx** - Metadata
```typescript
export const metadata = {
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'HMS' },
  themeColor: '#1a6fc4',
}
```

**Why:** User requested PWA support to enable installation as native app on devices.

**How to apply:** Configuration is already in place. For new projects, follow the same pattern with next-pwa plugin and manifest.json.
