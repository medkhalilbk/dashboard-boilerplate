import { IProduct } from '@/types/product';
import Image from 'next/image';
import React from 'react';

 
interface ProductCardProps {
    product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-row justify-between align-center w-full">
            <Image className='rounded-full' src={product.mainImageUrl} alt={product.name} width={100} height={100} />
            <h1 className="text-xl my-2">{product.name.toLocaleUpperCase()}</h1>
            <h1 className="text-xl my-2">{product.price} DT</h1>
        </div>
    );
};

export default ProductCard;