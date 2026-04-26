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

interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: string
  isActive: boolean
}

export function UsersModule() {
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})
  const [searchValue, setSearchValue] = useState('')

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/users')
      const json = await res.json()
      // API returns { success, data } format
      return Array.isArray(json) ? json : (json.data || [])
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: Partial<User>) => {
      const res = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setDialogOpen(false)
      setFormData({})
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: User) => {
      const res = await fetch(`http://localhost:3001/api/users/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setDialogOpen(false)
      setFormData({})
      setSelectedUser(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3001/api/users/${id}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setConfirmOpen(false)
      setSelectedUser(null)
    },
  })

  const columnDefs: ColDef<User>[] = [
    { field: 'username', headerName: 'Tên đăng nhập', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fullName', headerName: 'Họ và tên', width: 200 },
    { field: 'role', headerName: 'Vai trò', width: 120 },
    { field: 'isActive', headerName: 'Trạng thái', width: 120, valueFormatter: (params) => (params.value ? 'Hoạt động' : 'Khóa') },
  ]

  const filteredUsers = Array.isArray(users) ? users.filter((user: User) =>
    Object.values(user).some((val) => String(val).toLowerCase().includes(searchValue.toLowerCase()))
  ) : []

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, p: 1, overflow: 'auto' }}>
        <AppGrid rowData={filteredUsers} columnDefs={columnDefs} onRowSelected={setSelectedUser} loading={isLoading} />
      </Box>
      <CrudToolbar
        onAdd={() => {
          setFormData({})
          setDialogOpen(true)
        }}
        onEdit={() => {
          if (selectedUser) {
            setFormData(selectedUser)
            setDialogOpen(true)
          }
        }}
        onDelete={() => selectedUser && setConfirmOpen(true)}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
        onClose={() => {
          const closeTab = useAppStore.getState().closeTab
          closeTab('users')
        }}
        editDisabled={!selectedUser}
        deleteDisabled={!selectedUser}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onPrint={() => console.log('In')}
        onExportExcel={() => console.log('Xuất Excel')}
        additionalMenuItems={[
          { label: 'Nhập từ Excel', onClick: () => console.log('Nhập Excel') },
          { label: 'Sao chép', onClick: () => console.log('Sao chép') },
        ]}
      />

      <FormDialog
        open={dialogOpen}
        title={formData.id ? 'Sửa người dùng' : 'Thêm người dùng'}
        onClose={() => {
          setDialogOpen(false)
          setFormData({})
        }}
        onConfirm={() => {
          if (formData.id) {
            updateMutation.mutate(formData as User)
          } else {
            createMutation.mutate(formData)
          }
        }}
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Tên đăng nhập" value={formData.username || ''} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
          <TextField label="Email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <TextField label="Họ và tên" value={formData.fullName || ''} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
          <TextField label="Vai trò" value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
        </Stack>
      </FormDialog>

      <ConfirmDialog open={confirmOpen} title="Xác nhận xóa" message={`Bạn có chắc chắn muốn xóa người dùng "${selectedUser?.username}"?`} onClose={() => setConfirmOpen(false)} onConfirm={() => selectedUser && deleteMutation.mutate(selectedUser.id)} />
    </Box>
  )
}
