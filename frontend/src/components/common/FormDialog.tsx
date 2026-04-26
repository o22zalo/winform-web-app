'use client'

import type { ReactNode } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'

export function FormDialog({
  open,
  title,
  children,
  onClose,
  onConfirm,
}: {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onConfirm} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function ConfirmDialog({
  open,
  title,
  message,
  onClose,
  onConfirm,
}: {
  open: boolean
  title: string
  message: string
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}
