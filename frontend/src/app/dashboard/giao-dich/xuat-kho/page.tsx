'use client'

import { Box, Typography } from '@mui/material'
import { PackageMinus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function XuatKhoPage() {
  return (
    <Box>
      <PageHeader title="Xuất kho" subtitle="Trang đang được hoàn thiện" icon={<PackageMinus size={20} />} />
      <Typography>Module xuất kho sẽ được triển khai tiếp theo.</Typography>
    </Box>
  )
}
