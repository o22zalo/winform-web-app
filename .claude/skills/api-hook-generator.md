---
name: api-hook-generator
description: Generate TanStack Query hooks for API endpoints
---

# API Hook Generator Skill

Generates TanStack Query hooks (useQuery, useMutation) for API endpoints.

## Usage

```
/api-hook-generator <entity> <operations>
```

**Parameters:**
- `entity`: Entity name (e.g., hang-hoa, khach-hang)
- `operations`: Comma-separated list (list, detail, create, update, delete)

**Examples:**
```
/api-hook-generator hang-hoa list,detail,create,update,delete

/api-hook-generator bao-cao list
```

## What it does

1. Creates custom hooks file
2. Generates useQuery hooks for GET operations
3. Generates useMutation hooks for POST/PUT/DELETE
4. Adds proper TypeScript types
5. Implements error handling
6. Adds success/error toasts
7. Updates query keys file

## Generated Hooks

### For "list" operation:
```tsx
export const useHangHoaList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.HANG_HOA_LIST,
    queryFn: () => apiClient.get<HangHoa[]>('/hang-hoa'),
  })
}
```

### For "create" operation:
```tsx
export const useCreateHangHoa = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<HangHoa>) => 
      apiClient.post<HangHoa>('/hang-hoa', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HANG_HOA_LIST })
      showSuccess('Thêm thành công')
    },
    onError: () => showError('Thêm thất bại'),
  })
}
```

## Output Files

- `lib/api/use{Entity}.ts` - Custom hooks
- Updates to `lib/api/queryKeys.ts`

## Features

- Automatic cache invalidation
- Toast notifications
- TypeScript type safety
- Error handling
- Loading states
