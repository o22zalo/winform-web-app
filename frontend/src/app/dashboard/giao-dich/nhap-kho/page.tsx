'use client'

import { Box, Typography } from '@mui/material'
import { PackagePlus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function NhapKhoPage() {
  return (
    <Box>
      <PageHeader title="Nhập kho" subtitle="Trang đang được hoàn thiện" icon={<PackagePlus size={20} />} />
      <Typography>Module nhập kho sẽ được triển khai tiếp theo.</Typography>
    </Box>
  )
}
