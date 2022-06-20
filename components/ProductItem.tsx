/* eslint-disable react/display-name */
import React, { memo, useState } from 'react';
import { AddProductToWishListProps } from './AddProductToWishList';
import dynamic from 'next/dynamic';
import lodash from 'lodash';

// importação condicional, só acontece se for usada
// se for no react puro, usar a função "lazy" aon invés de "dynamic"
// https://pt-br.reactjs.org/docs/code-splitting.html
const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

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
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  // importação condicional
  // async function showFormattedDate() {
  //   const { format } = await import('date-fns')

  //   format()
  // }

  return (
    <div>
      {product.title} -  <strong>{product.priceFormatted}</strong>      
      <button onClick={() => setIsAddingToWishList(true)} >Adicionar aos favoritos</button>
      
      {isAddingToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
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
  return lodash.isEqual(prevProps.product, nextProps.product);
});