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
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
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

export function getLongAndLatFromUrl(url: string) {
  const regex1 = /@(-?\d+\.\d+),(-?\d+\.\d+)/;  // For coordinates after @ symbol
  const regex2 = /\/maps\?q=(-?\d+\.\d+),(-?\d+\.\d+)/; // For Google Maps URL format

  let match = url.match(regex1);
  if (!match) {
    match = url.match(regex2);
  }

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    return { latitude, longitude };
  }
  
  return null;
}
export function getUrlFromLongAndLat({latitude , longitude} : {latitude:number,longitude:number}): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export function generatePassword() {
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let password = '';
  
  // Ensure at least one uppercase letter, one number, and one special character
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
  // Fill the remaining length with random characters from all categories
  const allChars = upperCaseChars + lowerCaseChars + numbers + specialChars;
  for (let i = password.length; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password to randomize the order
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password;
}
