export interface IOrder {
  id: string;
  productId: string;
  quantity: number;
  restaurantId: string;
  price: number;
  createdAt: Date;
  supplementsIds?: string[];
}

export enum OrderStatus {
  inProgress = "inProgress",
  Collected = "Collected"
}