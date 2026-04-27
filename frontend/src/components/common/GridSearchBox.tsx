'use client'

import { TextField, InputAdornment } from '@mui/material'
import { Search } from 'lucide-react'

interface GridSearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function GridSearchBox({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
}: GridSearchBoxProps) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        ml: 'auto',
        width: { xs: '100%', sm: 260 },
        flexShrink: 0,
      }}
    />
  )
}
