---
name: code-review
description: Review code against project rules and best practices
---

# Code Review Skill

Reviews code files against ARCHITECTURE.md and RULES.md standards.

## Usage

```
/code-review <file-path>
```

**Parameters:**
- `file-path`: Path to file to review (relative to src/)

**Examples:**
```
/code-review app/(main)/danh-muc/hang-hoa/page.tsx

/code-review components/CustomGrid/CustomGrid.tsx
```

## What it checks

### Architecture Compliance
- [ ] Template comment present and correct
- [ ] Module comment present
- [ ] Using correct template structure
- [ ] File in correct location

### Component Rules
- [ ] Functional component (not class)
- [ ] Props have TypeScript interface
- [ ] Not recreating shared components

### Styling Rules
- [ ] Using MUI sx or styled()
- [ ] No hard-coded colors
- [ ] Using theme tokens
- [ ] CSS variables use --app- prefix

### Icon Rules
- [ ] Using Lucide React only
- [ ] Correct icon sizes
- [ ] No @mui/icons-material imports

### Form Rules
- [ ] Using React Hook Form
- [ ] Zod schema defined
- [ ] Validation messages in Vietnamese
- [ ] Dirty state handling

### Data Fetching Rules
- [ ] Using TanStack Query
- [ ] Not fetching in useEffect
- [ ] Using QUERY_KEYS constants
- [ ] Error handling present

### Grid Rules
- [ ] Using AppGrid wrapper
- [ ] Not using AgGridReact directly
- [ ] Vietnamese locale text
- [ ] Column definitions typed

### General Rules
- [ ] File under 300 lines
- [ ] No console.log statements
- [ ] Proper error handling
- [ ] Loading states present
- [ ] TypeScript strict mode compliant

## Output

1. **Compliance Score**: X/10
2. **Issues Found**: List of violations
3. **Suggestions**: How to fix each issue
4. **Best Practices**: Additional improvements
5. **Refactoring**: If file too large, suggest splits

## Example Output

```
📊 Code Review Results

File: app/(main)/danh-muc/hang-hoa/page.tsx
Template: T1 - List Page ✓
Compliance Score: 8/10

❌ Issues Found:
1. Line 45: Hard-coded color #1a6fc4 → Use theme.palette.primary.main
2. Line 78: Missing error handling in mutation
3. Line 120: File is 315 lines → Consider splitting form into separate component

✓ Good Practices:
- Proper template structure
- Using AppGrid wrapper
- Zod validation present
- TypeScript types defined

💡 Suggestions:
1. Extract form dialog to separate component
2. Add onError handler to mutation
3. Replace hard-coded color with theme token
```
