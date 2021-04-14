import React from 'react'
import { IDevices } from '../../../store/types/shopT';
import { ProductItem } from './ProductItem';

type ProductsProps = {
  products: IDevices[];
}

export const Products: React.FC<ProductsProps> = ({ products }) => {

  
  return (
    <>
      {products.map(product =>
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          brandId={product.brandId}
          typeId={product.typeId}
          img={product.img}
          price={product.price}
          rating={product.rating}/>)}
    </>
  )
}