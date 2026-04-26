import { apiClient } from '@/lib/apiClient'

/**
 * Inventory Types
 */
export interface InventoryTransaction {
  id: string
  transactionNo: string
  transactionDate: string
  type: 'import' | 'export'
  productId: string
  productCode: string
  productName: string
  quantity: number
  price: number
  amount: number
  supplierId?: string
  supplierName?: string
  customerId?: string
  customerName?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface InventoryCreateRequest {
  transactionDate: string
  type: 'import' | 'export'
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  supplierId?: string
  customerId?: string
  notes?: string
}

export interface InventoryListParams {
  page?: number
  limit?: number
  search?: string
  type?: 'import' | 'export'
  productId?: string
  fromDate?: string
  toDate?: string
}

export interface InventoryListResponse {
  items: InventoryTransaction[]
  total: number
  page: number
  limit: number
}

export interface StockReport {
  productId: string
  productCode: string
  productName: string
  beginningStock: number
  importQuantity: number
  exportQuantity: number
  endingStock: number
}

/**
 * Inventory Service
 */
export const inventoryService = {
  getAll: async (params?: InventoryListParams): Promise<InventoryListResponse> => {
    const queryString = new URLSearchParams(params as any).toString()
    return apiClient.get<InventoryListResponse>(`/inventory${queryString ? `?${queryString}` : ''}`)
  },

  getById: async (id: string): Promise<InventoryTransaction> => {
    return apiClient.get<InventoryTransaction>(`/inventory/${id}`)
  },

  create: async (data: InventoryCreateRequest): Promise<InventoryTransaction> => {
    return apiClient.post<InventoryTransaction>('/inventory', data)
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/inventory/${id}`)
  },

  getStockReport: async (fromDate?: string, toDate?: string): Promise<StockReport[]> => {
    const params = new URLSearchParams()
    if (fromDate) params.append('fromDate', fromDate)
    if (toDate) params.append('toDate', toDate)
    return apiClient.get<StockReport[]>(`/inventory/stock-report${params.toString() ? `?${params.toString()}` : ''}`)
  },
}
