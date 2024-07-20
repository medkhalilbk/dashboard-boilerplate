import { Product } from "./product";

export interface Supplement {
    id: string;
    name: string;
    price: number;
    productId: string;
    Product: Product;
  }