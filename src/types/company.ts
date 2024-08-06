import { Menu } from "./menu";

<<<<<<< HEAD
import {Location} from "./location"; 

=======
import {Location} from "./location";
 
>>>>>>> 54bf4cde51022cdce10a0589abdc12f0eae33682
export interface Company {

  id: string;
  name: string;
  description: string;
  phoneNumber?: string | null;
  location?: Location | null;
  availabilityDistance?: number | null;
  mainImage: string;
  otherImages: string[];
  workHours?: string | null;
  days: IDay[];

  type: string; // Default value "Restaurant"
  specialty?: string | null;
  menu: Menu[];
  keywords: string[];
}
export interface IWorkHours {

  start: Date;
  end: Date;
}

export enum IDay {

  lundi = "lundi",
  mardi = "mardi",
  mercredi = "mercredi",
  jeudi = "jeudi",
  vendredi = "vendredi",
  samedi = "samedi",
  dimanche = "dimanche",
}
