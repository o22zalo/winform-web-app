// Toast notification utilities (placeholder - will use MUI Snackbar)

type ToastType = 'success' | 'error' | 'warning' | 'info'

let toastCallback: ((message: string, type: ToastType) => void) | null = null

export const setToastHandler = (handler: (message: string, type: ToastType) => void) => {
  toastCallback = handler
}

export const showSuccess = (message: string) => {
  toastCallback?.(message, 'success')
}

export const showError = (message: string) => {
  toastCallback?.(message, 'error')
}

export const showWarning = (message: string) => {
  toastCallback?.(message, 'warning')
}

export const showInfo = (message: string) => {
  toastCallback?.(message, 'info')
}
