import { IMenu } from "./menu";
import { Supplement } from "./supplement";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  companyId:string,
  description: string;
  mainImageUrl: string;
  otherImagesUrl?: string[];
  supplements?: Supplement[];
  supplementsId: string[];
  menuId: string;
  inStock: boolean
}