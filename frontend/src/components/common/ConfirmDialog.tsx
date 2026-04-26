import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  severity?: 'info' | 'warning' | 'error' | 'success'
  confirmText?: string
  cancelText?: string
}

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  severity = 'warning',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
}: ConfirmDialogProps) {
  const icons = {
    info: <Info size={48} color="#2196f3" />,
    warning: <AlertTriangle size={48} color="#ff9800" />,
    error: <XCircle size={48} color="#f44336" />,
    success: <CheckCircle size={48} color="#4caf50" />,
  }

  const colors = {
    info: 'info',
    warning: 'warning',
    error: 'error',
    success: 'success',
  }

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {icons[severity]}
          <Typography>{message}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={colors[severity] as any}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
