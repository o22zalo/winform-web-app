'use client'

import { Box, Typography } from '@mui/material'
import { Building2 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function NhaCungCapPage() {
  return (
    <Box>
      <PageHeader title="Danh mục nhà cung cấp" subtitle="Trang đang được hoàn thiện" icon={<Building2 size={20} />} />
      <Typography>Module nhà cung cấp sẽ được triển khai tiếp theo.</Typography>
    </Box>
  )
}
