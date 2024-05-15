import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
const bcrypt = require("bcrypt");
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


