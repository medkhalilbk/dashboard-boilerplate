export interface IDeliveryMan {
    id: string;
    fullName: string;
    phoneNumber: string;
    socialStatus?: string;
    ordersCompleted: number;
    vehiculeSerialNumber?: string;
    isDeleted:true,
    cin: string;
    isActive: boolean;
    contractFile?: string;
    userInfo?:any
  }
