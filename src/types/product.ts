import { IMenu } from "./menu";
import { Supplement } from "./supplement";

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    mainImageUrl: string;
    otherImagesUrl: string[];
    supplements: Supplement[];
    menuId: string;
    Menu: IMenu;
  }