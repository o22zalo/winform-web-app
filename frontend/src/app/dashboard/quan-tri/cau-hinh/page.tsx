'use client'

import { Box, Typography } from '@mui/material'
import { Settings } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function CauHinhPage() {
  return (
    <Box>
      <PageHeader title="Cấu hình" subtitle="Trang đang được hoàn thiện" icon={<Settings size={20} />} />
      <Typography>Module cấu hình sẽ được triển khai tiếp theo.</Typography>
    </Box>
  )
}
