---
name: component-generator
description: Generate a new shared component with TypeScript types
---

# Component Generator Skill

Generates a new shared component following project conventions.

## Usage

```
/component-generator <category> <name> <props>
```

**Parameters:**
- `category`: Folder name (e.g., common, forms, layouts)
- `name`: Component name (PascalCase)
- `props`: Comma-separated prop definitions

**Prop format:**
```
propName:type:required
```

**Examples:**
```
/component-generator common DataTable data:any[]:true,columns:ColDef[]:true,onRowClick:function:false

/component-generator forms SearchBox placeholder:string:false,onSearch:function:true,debounce:number:false
```

## What it does

1. Creates component file with proper structure
2. Generates TypeScript interface for props
3. Adds JSDoc comments
4. Implements proper MUI styling
5. Exports component correctly
6. Creates index.ts for easy imports

## Component Structure

```tsx
'use client'

import { ... } from '@mui/material'

export interface {Name}Props {
  // Props interface
}

export const {Name}: React.FC<{Name}Props> = ({
  // Props destructuring
}) => {
  // Implementation
  return (...)
}
```

## Best Practices Applied

- Functional component only
- Props typing required
- MUI sx for styling
- Lucide icons if needed
- Proper exports
