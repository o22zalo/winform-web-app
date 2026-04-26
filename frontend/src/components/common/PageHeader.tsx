'use client'

import { Box, Typography } from '@mui/material'
import { useAppStore } from '@/lib/store/uiStore'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const mode = useAppStore((state) => state.mode)

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.75,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: mode === 'dark' ? '#2d3748' : '#dbe6f1',
      }}
    >
      <Typography sx={{ fontSize: 18, color: mode === 'dark' ? '#4a9eff' : '#37638a', fontWeight: 600 }}>
        :: {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
