'use client'

import { Box, TextField, Button } from '@mui/material'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface ReportFilterProps {
  onFilter: (filters: { startDate?: string; endDate?: string }) => void
}

export function ReportFilter({ onFilter }: ReportFilterProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleFilter = () => {
    onFilter({ startDate, endDate })
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
      <TextField
        label="Từ ngày"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
        size="small"
      />
      <TextField
        label="Đến ngày"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
        size="small"
      />
      <Button
        variant="contained"
        startIcon={<Search size={18} />}
        onClick={handleFilter}
      >
        Lọc
      </Button>
    </Box>
  )
}
