'use client'

import { Box, Typography } from '@mui/material'
import { FileText } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function BaoCaoChiTietPage() {
  return (
    <Box>
      <PageHeader title="Báo cáo chi tiết" subtitle="Trang đang được hoàn thiện" icon={<FileText size={20} />} />
      <Typography>Module báo cáo chi tiết sẽ được triển khai tiếp theo.</Typography>
    </Box>
  )
}
