import { CartStatus } from "@prisma/client";
import { IOrder } from "./order";

export interface ICartPopulated {
    id: string;
    orders: IOrder[];
    location: Location;
    totalPrice: number;
    clientId: string;
    deliveryManAccountId: string;
    status: CartStatus;
    companiesIds: string[],
    createdAt: Date;
}