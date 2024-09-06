
import { ICompany } from "./company";
import { IProduct } from "./product";

export interface IMenu {
  id: string;
  name: string;
  products?: IProduct[]; 
  company?: ICompany;
  companyId: string;
  isActive: boolean
}


export interface IUpdatedMenu {
  id: string;
  name: string;
  productsId: string[];
  companyId: string;
  isActive: boolean
}