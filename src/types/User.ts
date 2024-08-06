import { Location } from "./location";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Roles;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt?: Date;
    companyId?: string;
    deliveryManId?: string;
    deliveryAddress?: Location;
    imgUrl?: string;
    isDeleted: boolean;
}

export enum Roles {
    User = 'user',
    DeliveryMan = 'deliveryMan',
    CompanyAdmin = 'companyAdmin',
    SuperAdmin = 'superAdmin',
}