import { Menu } from "./menu";

export interface Company {
  id: string;
  name: string;
  description: string;
  phoneNumber?: string | null;
  location?: Location | null;
  availabilityDistance?: number | null;
  mainImage: string;
  otherImages: string[];
  workHours?: WorkHours | null;
  days: Day[];
  type: string; // Default value "Restaurant"
  specialty?: string | null;
  menu: Menu[];
  keywords: string[];
}
export interface WorkHours {
  start: Date;
  end: Date;
}

export enum Day {
  lundi = "lundi",
  mardi = "mardi",
  mercredi = "mercredi",
  jeudi = "jeudi",
  vendredi = "vendredi",
  samedi = "samedi",
  dimanche = "dimanche",
}
