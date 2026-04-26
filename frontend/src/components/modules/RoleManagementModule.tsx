'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Chip,
  Stack,
  Alert,
} from '@mui/material'
import { Plus, Pencil, Trash2, Printer, FileSpreadsheet, Shield, Users } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ColDef } from 'ag-grid-community'
import { AppGrid } from '@/components/common/AppGrid'
import { FormDialog, ConfirmDialog } from '@/components/common/FormDialog'
import { apiClient } from '@/lib/apiClient'
import { useApiError } from '@/hooks/useApiError'

interface Role {
  id: number
  code: string
  name: string
  description: string
  is_active: boolean
}

interface Module {
  id: number
  code: string
  name: string
  section: string
}

interface Permission {
  id: number
  module_id: number
  code: string
  name: string
}

interface RolePermission {
  permission_id: number
  granted: boolean
}

interface UserByRole {
  username: string
  fullName: string
  email: string
  assigned_at: string
  assigned_by: string
}

export function RoleManagementModule() {
  const queryClient = useQueryClient()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [rolePermissions, setRolePermissions] = useState<Record<number, boolean>>({})
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [usersDialogOpen, setUsersDialogOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Role>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { handleError, ErrorSnackbar } = useApiError()

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => apiClient.get<Role[]>('/api/admin/roles'),
  })

  const { data: modules = [] } = useQuery({
    queryKey: ['modules'],
    queryFn: () => apiClient.get<Module[]>('/api/admin/modules'),
  })

  const { data: permissions = [] } = useQuery({
    queryKey: ['permissions'],
    queryFn: () => apiClient.get<Permission[]>('/api/admin/permissions'),
  })

  const { data: usersByRole = [] } = useQuery({
    queryKey: ['usersByRole', selectedRole?.id],
    queryFn: () => apiClient.get<UserByRole[]>(`/api/admin/roles/${selectedRole?.id}/users`),
    enabled: !!selectedRole?.id && usersDialogOpen,
  })

  const createMutation = useMutation({
    mutationFn: (data: Partial<Role>) => apiClient.post<Role>('/api/admin/roles', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      setFormDialogOpen(false)
      setFormData({})
    },
    onError: (error) => handleError(error, 'tạo vai trò'),
  })

  const updateMutation = useMutation({
    mutationFn: (data: Role) => apiClient.put<Role>(`/api/admin/roles/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      setFormDialogOpen(false)
      setFormData({})
      setSelectedRole(null)
    },
    onError: (error) => handleError(error, 'cập nhật vai trò'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.put(`/api/admin/roles/${id}`, { isActive: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      setConfirmOpen(false)
      setSelectedRole(null)
    },
    onError: (error) => handleError(error, 'xóa vai trò'),
  })

  const columnDefs: ColDef<Role>[] = [
    { field: 'code', headerName: 'Mã vai trò', width: 150 },
    { field: 'name', headerName: 'Tên vai trò', width: 200 },
    { field: 'description', headerName: 'Mô tả', flex: 1 },
    {
      field: 'is_active',
      headerName: 'Trạng thái',
      width: 120,
      valueFormatter: (params) => (params.value ? 'Hoạt động' : 'Ngưng'),
    },
  ]

  const handleOpenPermissionDialog = async (role: Role) => {
    setSelectedRole(role)
    setLoading(true)
    setError('')

    try {
      const data = await apiClient.get<RolePermission[]>(`/api/admin/roles/${role.id}/permissions`)
      const permMap: Record<number, boolean> = {}
      data.forEach((rp) => {
        permMap[rp.permission_id] = rp.granted
      })
      setRolePermissions(permMap)
      setPermissionDialogOpen(true)
    } catch (err) {
      setError('Không thể tải quyền vai trò')
    } finally {
      setLoading(false)
    }
  }

  const handleSavePermissions = async () => {
    if (!selectedRole) return

    setLoading(true)
    setError('')

    try {
      const permissionsToSave = Object.entries(rolePermissions).map(([permId, granted]) => ({
        permission_id: parseInt(permId),
        granted,
      }))

      await apiClient.post(`/api/admin/roles/${selectedRole.id}/permissions`, {
        permissions: permissionsToSave,
      })

      setPermissionDialogOpen(false)
      setSelectedRole(null)
      setRolePermissions({})
    } catch (err) {
      setError('Không thể lưu quyền vai trò')
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePermission = (permissionId: number) => {
    setRolePermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }))
  }

  const handleSelectAllModule = (moduleId: number, checked: boolean) => {
    const modulePerms = permissions.filter((p) => p.module_id === moduleId)
    const updates: Record<number, boolean> = {}
    modulePerms.forEach((p) => {
      updates[p.id] = checked
    })
    setRolePermissions((prev) => ({ ...prev, ...updates }))
  }

  const getModulePermissions = (moduleId: number) => {
    return permissions.filter((p) => p.module_id === moduleId)
  }

  const isModuleFullySelected = (moduleId: number) => {
    const modulePerms = getModulePermissions(moduleId)
    return modulePerms.length > 0 && modulePerms.every((p) => rolePermissions[p.id] === true)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = `
      <html>
        <head>
          <title>Danh sách vai trò</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #1976d2; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #1976d2; color: white; padding: 10px; text-align: left; border: 1px solid #ddd; }
            td { padding: 8px; border: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .print-date { text-align: right; font-size: 12px; color: #666; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>DANH SÁCH VAI TRÒ</h1>
          <table>
            <thead>
              <tr>
                <th>Mã vai trò</th>
                <th>Tên vai trò</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              ${roles
                .map(
                  (role) => `
                <tr>
                  <td>${role.code}</td>
                  <td>${role.name}</td>
                  <td>${role.description || ''}</td>
                  <td>${role.is_active ? 'Hoạt động' : 'Ngưng'}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
          <div class="print-date">Ngày in: ${new Date().toLocaleString('vi-VN')}</div>
        </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  const handleExportExcel = () => {
    const headers = ['Mã vai trò', 'Tên vai trò', 'Mô tả', 'Trạng thái']
    let csv = headers.join(',') + '\n'

    roles.forEach((role) => {
      const row = [
        role.code,
        role.name,
        role.description || '',
        role.is_active ? 'Hoạt động' : 'Ngưng',
      ]
      csv += row.map((cell) => `"${cell}"`).join(',') + '\n'
    })

    const BOM = '﻿'
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `vai-tro-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
  }

  return (
    <Box sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, minHeight: 0, p: 1, pb: 0, overflow: 'hidden' }}>
        <AppGrid
          rowData={roles}
          columnDefs={columnDefs}
          loading={rolesLoading}
          onRowSelected={(role) => setSelectedRole(role)}
        />
      </Box>

      <Box sx={{ flexShrink: 0, p: 1, pt: 0, backgroundColor: 'background.default' }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            px: 1,
            py: 0.75,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            flexWrap: 'wrap',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <Button
            startIcon={<Plus size={16} />}
            onClick={() => {
              setFormData({})
              setSelectedRole(null)
              setFormDialogOpen(true)
            }}
          >
            Thêm
          </Button>
          <Button
            startIcon={<Pencil size={16} />}
            onClick={() => {
              if (selectedRole) {
                setFormData(selectedRole)
                setFormDialogOpen(true)
              }
            }}
            disabled={!selectedRole}
          >
            Sửa
          </Button>
          <Button
            startIcon={<Trash2 size={16} />}
            onClick={() => selectedRole && setConfirmOpen(true)}
            disabled={!selectedRole}
            color="error"
          >
            Xóa
          </Button>
          <Button
            startIcon={<Shield size={16} />}
            onClick={() => selectedRole && handleOpenPermissionDialog(selectedRole)}
            disabled={!selectedRole}
          >
            Phân quyền
          </Button>
          <Button
            startIcon={<Users size={16} />}
            onClick={() => selectedRole && setUsersDialogOpen(true)}
            disabled={!selectedRole}
          >
            Xem User
          </Button>
          <Button startIcon={<Printer size={16} />} onClick={handlePrint}>
            In
          </Button>
          <Button startIcon={<FileSpreadsheet size={16} />} onClick={handleExportExcel}>
            Xuất Excel
          </Button>
        </Stack>
      </Box>

      <FormDialog
        open={formDialogOpen}
        title={selectedRole ? 'Sửa vai trò' : 'Thêm vai trò'}
        onClose={() => {
          setFormDialogOpen(false)
          setFormData({})
          setSelectedRole(null)
        }}
        onConfirm={() => {
          if (selectedRole) {
            updateMutation.mutate({ ...selectedRole, ...formData } as Role)
          } else {
            createMutation.mutate(formData)
          }
        }}
      >
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Mã vai trò"
            value={formData.code || ''}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            disabled={!!selectedRole}
            fullWidth
          />
          <TextField
            label="Tên vai trò"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Mô tả"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
      </FormDialog>

      <ConfirmDialog
        open={confirmOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa vai trò "${selectedRole?.name}"?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => selectedRole && deleteMutation.mutate(selectedRole.id)}
      />

      <Dialog
        open={permissionDialogOpen}
        onClose={() => setPermissionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Phân quyền: {selectedRole?.name}</DialogTitle>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2} sx={{ mt: 1 }}>
            {modules.map((module) => {
              const modulePerms = getModulePermissions(module.id)
              const allSelected = isModuleFullySelected(module.id)

              return (
                <Paper key={module.id} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={allSelected}
                          onChange={(e) => handleSelectAllModule(module.id, e.target.checked)}
                        />
                      }
                      label={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {module.name}
                        </Typography>
                      }
                    />
                    <Chip label={module.section} size="small" sx={{ ml: 1 }} />
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ml: 4 }}>
                    {modulePerms.map((perm) => (
                      <FormControlLabel
                        key={perm.id}
                        control={
                          <Checkbox
                            checked={rolePermissions[perm.id] === true}
                            onChange={() => handleTogglePermission(perm.id)}
                            size="small"
                          />
                        }
                        label={perm.name}
                      />
                    ))}
                  </Box>
                </Paper>
              )
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPermissionDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleSavePermissions} variant="contained" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={usersDialogOpen} onClose={() => setUsersDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Danh sách User - {selectedRole?.name}</DialogTitle>
        <DialogContent dividers>
          {usersByRole.length === 0 ? (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              Chưa có user nào được gán vai trò này
            </Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tài khoản</TableCell>
                    <TableCell>Họ tên</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Ngày gán</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersByRole.map((user) => (
                    <TableRow key={user.username}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.assigned_at).toLocaleDateString('vi-VN')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUsersDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <ErrorSnackbar />
    </Box>
  )
}
