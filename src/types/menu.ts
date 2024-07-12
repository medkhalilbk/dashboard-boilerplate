import { Company } from "./company";
import { Product } from "./product";

export interface Menu {
  id: string;
  name: string;
  products: Product[];
  company: Company;
  companyId: string;
}
