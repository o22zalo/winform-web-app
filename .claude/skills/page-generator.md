---
name: page-generator
description: Generate a new page based on one of the 5 templates (T1-T5)
---

# Page Generator Skill

Generates a complete page implementation based on the 5 standard templates.

## Usage

```
/page-generator <template> <module> <name>
```

**Parameters:**
- `template`: T1, T2, T3, T4, or T5
- `module`: danh-muc, giao-dich, bao-cao, or quan-tri
- `name`: Page name (kebab-case)

**Examples:**
```
/page-generator T1 danh-muc gia-ban
/page-generator T3 giao-dich tra-hang
/page-generator T5 bao-cao doanh-thu
```

## What it does

1. Creates page file at correct route location
2. Generates appropriate template code
3. Adds TypeScript types if needed
4. Creates Zod schema for forms
5. Sets up TanStack Query hooks
6. Adds route to sidebar menu
7. Creates query keys constants

## Template Details

### T1 - List Page
- CRUD toolbar + AG Grid + Form dialog
- For: Master data (Hàng hóa, Khách hàng, NCC)

### T2 - List + Edit Panel
- Split view: Grid (40%) + Form (60%)
- For: Settings, configurations

### T3 - Full Edit Form (Master-Detail)
- Master form + Detail grid (editable)
- Navigation buttons (Previous/Next)
- For: Orders, Invoices

### T4 - Wizard Form
- Multi-step form with stepper
- For: Complex workflows

### T5 - Report Form
- Filter + Grid + Export buttons
- For: Reports

## Output

The skill will:
1. Create the page file
2. Show the file path
3. List any additional files created (types, schemas)
4. Provide next steps for customization
