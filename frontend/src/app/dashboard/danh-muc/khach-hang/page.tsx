'use client'

import { Box, Typography } from '@mui/material'
import { Users } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function KhachHangPage() {
  return (
    <Box>
      <PageHeader title="Danh mục khách hàng" subtitle="Trang đang được hoàn thiện" icon={<Users size={20} />} />
      <Typography>Module khách hàng sẽ được triển khai tiếp theo.</Typography>
    </Box>
  )
}
