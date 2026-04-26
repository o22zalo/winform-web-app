---
name: form-builder
description: Generate a form with React Hook Form + Zod validation
---

# Form Builder Skill

Generates a complete form implementation with validation.

## Usage

```
/form-builder <entity-name> <fields>
```

**Parameters:**
- `entity-name`: Name of the entity (e.g., hang-hoa, khach-hang)
- `fields`: Comma-separated list of fields with types

**Field format:**
```
fieldName:type:label:required
```

**Types:** string, number, date, select, boolean

**Examples:**
```
/form-builder hang-hoa ma:string:Mã hàng:true,ten:string:Tên hàng:true,dvt:string:ĐVT:false,giaBan:number:Giá bán:true

/form-builder khach-hang ma:string:Mã KH:true,ten:string:Tên KH:true,dienThoai:string:Điện thoại:false,loaiKhach:select:Loại khách:true
```

## What it does

1. Creates Zod validation schema
2. Generates TypeScript interface
3. Creates form component with React Hook Form
4. Adds proper MUI form controls
5. Implements validation messages
6. Adds submit handler structure

## Output Files

- `{entity-name}Schema.ts` - Zod schema
- `{entity-name}Form.tsx` - Form component
- Updates to `types/index.ts` if needed

## Form Features

- Automatic field validation
- Vietnamese error messages
- Proper MUI styling
- Loading states
- Dirty state tracking
- Cancel confirmation
