'use client'

import { Box, Button } from '@mui/material'
import { Printer, FileDown, FileSpreadsheet } from 'lucide-react'

interface PrintExportBarProps {
  onPrint: () => void
  onExportPDF: () => void
  onExportExcel: () => void
}

export function PrintExportBar({ onPrint, onExportPDF, onExportExcel }: PrintExportBarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Button
        variant="outlined"
        startIcon={<Printer size={18} />}
        onClick={onPrint}
      >
        In
      </Button>
      <Button
        variant="outlined"
        startIcon={<FileDown size={18} />}
        onClick={onExportPDF}
      >
        Xuất PDF
      </Button>
      <Button
        variant="outlined"
        startIcon={<FileSpreadsheet size={18} />}
        onClick={onExportExcel}
      >
        Xuất Excel
      </Button>
    </Box>
  )
}
