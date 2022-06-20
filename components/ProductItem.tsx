/* eslint-disable react/display-name */
import React, { memo } from 'react';

type Product = {
  id: number,
  title: string;
  price: number;
  priceFormatted: string;
}

interface ProductItemProps {
  product: Product;
  onAddToWishList(id: number): Promise<void>;
}

const ProductItemComponent: React.FC<ProductItemProps> = ({ product, onAddToWishList }) => {
  return (
    <div>
      {product.title} -  <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishList(product.id)}>Favoritar</button>
    </div>
  )
}
/**
 * MEMO
 * shallow compare -> comparação rasa
 * compara as se as propriedades do componente mudaram
 * porém, se for objeto temos o seguinte
 * {} === {} // retorna false (igualdade referencial)
 * para resolver isso adiciona-se uma função que vai dizer
 * se o componente precisa ser renderizado novamente
 * 
 * Casos de uso
 * 1. Pure Functional Component
 *    Componente que apenas abstraem parte da interface (e não uma funcionalidade)
 *    "Passado o mesmo parâmetro sempre retorna o mesmo resultado"
 * 2. Renders to often
 * 3. Re-renders with same props
 * 4. Medium to bit size
 */


export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});