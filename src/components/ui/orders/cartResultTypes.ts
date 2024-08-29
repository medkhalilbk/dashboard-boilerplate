export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    mainImageUrl: string;
    otherImagesUrl: string[];
    supplements: any[]; // Replace `any` with a more specific type if needed
    inStock: boolean;
    companyId: string;
}

export interface Order {
    id: string;
    quantity: number;
    price: number;
    product: Product;
}

export interface Customer {
    deliveryAddress: string | null;
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string | null;
    companyId: string | null;
    deliveryManId: string | null;
    imgUrl: string | null;
    isDeleted: boolean;
    emailCode: string;
}

export interface Location {
    longitude: number;
    latitude: number;
}

export interface IOrderDetails {
    location: Location;
    id: string;
    orders: Order[];
    totalPrice: number;
    clientId: string;
    deliveryManAccountId: string | null;
    status: string;
    companiesIds: string[];
    createdAt: string;
    deliveryMan: string | Object ;
    customer: Customer;
}