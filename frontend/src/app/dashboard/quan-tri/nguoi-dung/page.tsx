'use client'

import { Box, Typography } from '@mui/material'
import { UserCog } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

export default function NguoiDungPage() {
  return (
    <Box>
      <PageHeader title="Người dùng" subtitle="Trang đang được hoàn thiện" icon={<UserCog size={20} />} />
      <Typography>Module người dùng sẽ được triển khai tiếp theo.</Typography>
    </Box>
  )
}
