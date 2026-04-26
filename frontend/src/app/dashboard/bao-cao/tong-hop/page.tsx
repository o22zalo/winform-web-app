'use client'

import { Box } from '@mui/material'
import { BarChart3 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PrintExportBar } from '@/components/PrintExportBar/PrintExportBar'
import { ReportFilter } from '@/components/ReportFilter/ReportFilter'

export default function BaoCaoTongHopPage() {
  return (
    <Box>
      <PageHeader title="Báo cáo tổng hợp" subtitle="Xem nhanh dữ liệu tổng hợp" icon={<BarChart3 size={20} />} />
      <ReportFilter onFilter={() => undefined} />
      <PrintExportBar onPrint={() => undefined} onExportPDF={() => undefined} onExportExcel={() => undefined} />
    </Box>
  )
}
