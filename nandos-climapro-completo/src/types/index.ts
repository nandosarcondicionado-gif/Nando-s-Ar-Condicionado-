export type UserRole = 'ADMIN' | 'TECHNICIAN' | 'CLIENT';

export interface Client {
  id: string;
  name: string;
  document?: string;
  phone: string;
  email?: string;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface Equipment {
  id: string;
  clientId: string;
  type: string;
  brand: string;
  model?: string;
  capacityBtu?: string;
  serialNumber?: string;
  environment?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  quantityAvailable: number;
  minQuantity: number;
  unitCost: number;
  salePrice: number;
}

export interface ServiceOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  address: string;
  equipmentInfo: string;
  reportedDefect: string;
  serviceDescription: string;
  status: 'DRAFT' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  laborCost?: number;
  materialsCost?: number;
  totalAmount?: number;
  scheduledAt: string;
}

export interface ErrorCode {
  brand: string;
  code: string;
  description: string;
  solution: string;
}
