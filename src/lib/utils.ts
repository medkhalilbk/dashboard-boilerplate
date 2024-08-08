import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Blowfish} from 'egoroof-blowfish'


import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function verifyEmail(email:string){
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function hashPassword(password: string) {
  const hashDigest = sha256(password).toString(Base64);
  const hashdigest = sha256(hashDigest).toString(Base64);
  const hmacdigest = Base64.stringify(hmacSHA512(hashdigest, "secret")); 
  return hmacdigest;
}


export function verifyPassword(hashedPassword: string, password:string):boolean {
    console.log(hashPassword(password))
    return hashedPassword === hashPassword(password);
}

export function verifyImageUrl(url:string){
  let re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  return re.test(url);
}

export function getLongAndLatFromUrl(url:string){
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = url.match(regex);
  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    return { latitude, longitude };
  }
  return null;
}