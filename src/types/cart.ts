import { Location } from "./location";

export interface ICart {
    id: string;
    orders: string[];
    location: Location;
    totalPrice: number;
    clientId: string;
    deliveryManAccountId: string;
    status: CartStatus;
    companiesIds: string[],
    createdAt: Date;
}
export enum CartStatus {
    step0 = "step0", // client created the cart
    step1 = "step1", // accepta el request of delivering
    step2 = "step2", // mechi ll company chyhez
    step3 = "step3", // hazha mel company
    step4 = "step4", // fi thneya
    step5 = "step5", // wselt
}