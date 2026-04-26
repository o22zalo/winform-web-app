'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { Package } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ColDef } from 'ag-grid-community'
import { CrudToolbar } from '@/components/common/CrudToolbar'
import { AppGrid } from '@/components/DataGrid/AppGrid'
import { FormDialog } from '@/components/common/FormDialog'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { PageHeader } from '@/components/common/PageHeader'
import type { HangHoaDto } from '@/types'

export default function HangHoaPage() {
  const queryClient = useQueryClient()
  const [selectedRow, setSelectedRow] = useState<HangHoaDto | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data = [], isLoading } = useQuery({
    queryKey: ['hang-hoa', 'list'],
    queryFn: async () => {
      return [
        { id: '1', ma: 'HH001', ten: 'Sản phẩm A', dvt: 'Cái', giaBan: 100000, tonKho: 50, trangThai: 'active' },
        { id: '2', ma: 'HH002', ten: 'Sản phẩm B', dvt: 'Hộp', giaBan: 200000, tonKho: 20, trangThai: 'active' },
      ] as HangHoaDto[]
    },
  })

  const columnDefs: ColDef<HangHoaDto>[] = [
    { field: 'ma', headerName: 'Mã hàng', width: 130 },
    { field: 'ten', headerName: 'Tên hàng', flex: 1 },
    { field: 'dvt', headerName: 'ĐVT', width: 100 },
    { field: 'giaBan', headerName: 'Giá bán', width: 140 },
    { field: 'tonKho', headerName: 'Tồn kho', width: 120 },
  ]

  return (
    <Box>
      <PageHeader title="Danh mục hàng hóa" subtitle="Danh sách hàng hóa" />
      <CrudToolbar
        onAdd={() => setDialogOpen(true)}
        onEdit={() => setDialogOpen(true)}
        onDelete={() => setConfirmOpen(true)}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: ['hang-hoa'] })}
        editDisabled={!selectedRow}
        deleteDisabled={!selectedRow}
      />
      <AppGrid rowData={data} columnDefs={columnDefs} onRowSelected={setSelectedRow} loading={isLoading} height="calc(100vh - 260px)" />
      <FormDialog open={dialogOpen} title={selectedRow ? 'Sửa hàng hóa' : 'Thêm hàng hóa'} onClose={() => setDialogOpen(false)} onConfirm={() => setDialogOpen(false)}>
        <Box sx={{ p: 2 }}>Form xử lý sau</Box>
      </FormDialog>
      <ConfirmDialog open={confirmOpen} title="Xác nhận xóa" message="Bạn có chắc muốn xóa bản ghi này?" onConfirm={() => setConfirmOpen(false)} onCancel={() => setConfirmOpen(false)} severity="error" />
    </Box>
  )
}
