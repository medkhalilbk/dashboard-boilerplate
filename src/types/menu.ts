
import { ICompany } from "./company";
import { Product } from "./product";

export interface IMenu {
  id: string;
  name: string;
  products: Product[];
  company: ICompany;
  companyId: string;
}
