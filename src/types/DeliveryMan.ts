export interface IDeliveryMan {
  id: string;
  fullName: string;
  phoneNumber: string;
  socialStatus?: string;
  ordersCompleted: number;
  vehiculeSerialNumber?: string;
  cin: string;
  isActive: boolean;
  contractFile?: string;
  userInfo?: any;
  isDeleted: boolean
}