import React from 'react';
import Image from 'next/image';
import {  Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle } from '../../card';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
interface CardProps {
    numbers: Number | string; 
    img:string | StaticImport ;
    description:string;
    percentage?:string,
}

interface IndicatorProps {
    sign:string
}

// it tooks the first char in the percentage string and checks if - or not.

const Indicator : React.FC<IndicatorProps>  = ({sign}) => {
    if (sign == "-" )  {return (
        <svg width="30" height="30" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16.908" y="17" width="16" height="16.1308" rx="8" transform="rotate(-180 16.908 17)" fill="#FF5B5B" fill-opacity="0.15"/>
    <g clip-path="url(#clip0_1_584)">
    <path d="M6.92815 9.74445L8.5752 11.405C8.66345 11.4939 8.78313 11.5439 8.90791 11.5439C9.03269 11.5439 9.15237 11.4939 9.24062 11.405L10.8877 9.74445C10.9734 9.65497 11.0208 9.53513 11.0198 9.41074C11.0187 9.28634 10.9692 9.16735 10.8819 9.07938C10.7947 8.99142 10.6767 8.94152 10.5533 8.94044C10.4299 8.93936 10.311 8.98718 10.2223 9.0736L9.3785 9.92426L9.3785 6.79964C9.3785 6.67381 9.32892 6.55313 9.24067 6.46416C9.15241 6.37519 9.03272 6.3252 8.90791 6.3252C8.7831 6.3252 8.66341 6.37519 8.57515 6.46416C8.4869 6.55313 8.43732 6.67381 8.43732 6.79964L8.43732 9.92426L7.59356 9.0736C7.5048 8.98718 7.38593 8.93936 7.26255 8.94044C7.13916 8.94152 7.02113 8.99142 6.93388 9.07938C6.84663 9.16735 6.79714 9.28634 6.79606 9.41073C6.79499 9.53513 6.84242 9.65497 6.92815 9.74445Z" fill="#FF5B5B"/>
    </g>
    <defs>
    <clipPath id="clip0_1_584">
    <rect width="5.64706" height="5.69322" fill="white" transform="translate(11.7315 11.7812) rotate(-180)"/>
    </clipPath>
    </defs>
    </svg>
    
       )}
 {
    return (<svg width="30" height="30" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="16.1308" width="16" height="16.1308" rx="8" transform="rotate(-180 16 16.1308)" fill="#2ED6A3" fill-opacity="0.15"/>
    <g clip-path="url(#clip0_105_72)">
    <path d="M6.02013 7.9264C6.10837 8.01534 6.22805 8.06531 6.35283 8.06531C6.47762 8.06531 6.59729 8.01534 6.68554 7.9264L7.5293 7.07574L7.5293 10.2004C7.5293 10.3262 7.57888 10.4469 7.66713 10.5358C7.75539 10.6248 7.87508 10.6748 7.99989 10.6748C8.1247 10.6748 8.24439 10.6248 8.33265 10.5358C8.4209 10.4469 8.47048 10.3262 8.47048 10.2004L8.47048 7.07574L9.31424 7.9264C9.403 8.01282 9.52187 8.06064 9.64526 8.05956C9.76864 8.05848 9.88667 8.00859 9.97392 7.92062C10.0612 7.83266 10.1107 7.71366 10.1117 7.58927C10.1128 7.46487 10.0654 7.34503 9.97966 7.25555L8.3326 5.59503C8.24435 5.50609 8.12467 5.45612 7.99989 5.45612C7.87511 5.45612 7.75543 5.50609 7.66719 5.59503L6.02013 7.25555C5.9319 7.34452 5.88234 7.46517 5.88234 7.59098C5.88234 7.71678 5.9319 7.83743 6.02013 7.9264V7.9264Z" fill="#00A389"/>
    </g>
    <defs>
    <clipPath id="clip0_105_72">
    <rect width="5.64706" height="5.69322" fill="white" transform="translate(10.8235 10.912) rotate(-180)"/>
    </clipPath>
    </defs>
    </svg>)
   } 

     
}

const CardDashboard: React.FC<CardProps> = ({ numbers, description,  img, percentage }) => {
    return (
<Card style={{height:200}}>
  <CardHeader>
  <div className="flex flex-row items-center justify-around">
  <Image alt='logo' height={70} width={90} src={img} />
  <div>
  <CardTitle className='text-slate-600 font-extrabold'>{numbers.toString()}</CardTitle> 
  <CardDescription>{description}</CardDescription>
  
  </div>
</div>
  </CardHeader>
  <CardContent>
    {percentage && <div className='flex row items-center justify-center'> 
    <Indicator sign={percentage.charAt(0)}/>
    <p className='text-slate-500 pl-2'> {percentage} (30) Jours</p></div>}
  </CardContent>
 
</Card>
           
    );
};

export default CardDashboard;