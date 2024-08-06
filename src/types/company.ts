
import { Location } from "./location";
import { IMenu } from "./menu";
export interface ICompany {

  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  location: Location
  availabilityDistance: number
  mainImage: string;
  otherImages: string[];
  workHours: IWorkHours
  days: IDay[];
  type?: string;
  specialty: string
  Menu: string[];
  keywords: string[];
}

export interface IWorkHours {
  start: string;
  end: string;
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
