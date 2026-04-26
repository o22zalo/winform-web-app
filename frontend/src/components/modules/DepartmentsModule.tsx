'use client'

import { useState } from 'react'
import { Box, Stack, TextField } from '@mui/material'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColDef } from 'ag-grid-community'
import { PageHeader } from '@/components/common/PageHeader'
import { CrudToolbar } from '@/components/common/CrudToolbar'
import { AppGrid } from '@/components/common/AppGrid'
import { FormDialog, ConfirmDialog } from '@/components/common/FormDialog'
import { useAppStore } from '@/lib/store/uiStore'

interface Department {
  id: string
  code: string
  name: string
  description: string
  isActive: boolean
}

export function DepartmentsModule() {
  const queryClient = useQueryClient()
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Department>>({})
  const [searchValue, setSearchValue] = useState('')

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/departments')
      const json = await res.json()
      return Array.isArray(json) ? json : (json.data || [])
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Department>) => {
      const res = await fetch('http://localhost:3001/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setDialogOpen(false)
      setFormData({})
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: Department) => {
      const res = await fetch(`http://localhost:3001/api/departments/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setDialogOpen(false)
      setFormData({})
      setSelectedDept(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3001/api/departments/${id}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setConfirmOpen(false)
      setSelectedDept(null)
    },
  })

  const columnDefs: ColDef<Department>[] = [
    { field: 'code', headerName: 'Mã khoa', width: 120 },
    { field: 'name', headerName: 'Tên khoa', width: 250 },
    { field: 'description', headerName: 'Mô tả', width: 300 },
    { field: 'isActive', headerName: 'Trạng thái', width: 120, valueFormatter: (params) => (params.value ? 'Hoạt động' : 'Khóa') },
  ]

  const filteredDepts = Array.isArray(departments) ? departments.filter((dept: Department) =>
    Object.values(dept).some((val) => String(val).toLowerCase().includes(searchValue.toLowerCase()))
  ) : []

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, p: 1, overflow: 'auto' }}>
        <AppGrid rowData={filteredDepts} columnDefs={columnDefs} onRowSelected={setSelectedDept} loading={isLoading} />
      </Box>
      <CrudToolbar
        onAdd={() => {
          setFormData({})
          setDialogOpen(true)
        }}
        onEdit={() => {
          if (selectedDept) {
            setFormData(selectedDept)
            setDialogOpen(true)
          }
        }}
        onDelete={() => selectedDept && setConfirmOpen(true)}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: ['departments'] })}
        onClose={() => {
          const closeTab = useAppStore.getState().closeTab
          closeTab('departments')
        }}
        onPrint={() => console.log('In')}
        onExportExcel={() => console.log('Xuất Excel')}
        additionalMenuItems={[
          { label: 'Nhập từ Excel', onClick: () => console.log('Nhập Excel') },
          { label: 'Sao chép', onClick: () => console.log('Sao chép') },
        ]}
        editDisabled={!selectedDept}
        deleteDisabled={!selectedDept}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <FormDialog
        open={dialogOpen}
        title={formData.id ? 'Sửa khoa phòng' : 'Thêm khoa phòng'}
        onClose={() => {
          setDialogOpen(false)
          setFormData({})
        }}
        onConfirm={() => {
          if (formData.id) {
            updateMutation.mutate(formData as Department)
          } else {
            createMutation.mutate(formData)
          }
        }}
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Mã khoa" value={formData.code || ''} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
          <TextField label="Tên khoa" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <TextField label="Mô tả" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} multiline rows={3} />
        </Stack>
      </FormDialog>

      <ConfirmDialog open={confirmOpen} title="Xác nhận xóa" message={`Bạn có chắc chắn muốn xóa khoa phòng "${selectedDept?.name}"?`} onClose={() => setConfirmOpen(false)} onConfirm={() => selectedDept && deleteMutation.mutate(selectedDept.id)} />
    </Box>
  )
}
