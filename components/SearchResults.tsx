import React, { useMemo } from 'react';
import { ProductItem } from './ProductItem';

type Product = {
  id: number,
  title: string;
  price: number;
}

// import { Container } from './styles';
interface SearchResultsProps {
  results: Product[];
  onAddToWishList(id: number): Promise<void>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onAddToWishList }) => {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0)
  }, [results])
  
  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map(product => {
        return (
          <ProductItem 
            key={product.id}
            product={product} 
            onAddToWishList={onAddToWishList} 
          />
        );
      })}
    </div>
  );
}

export default SearchResults;

/**
 * Fluxo de renderizção do react
 * 1. Criar nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */

/**
 * -> useMemo 
 * Evita que algo que custe muito processamento seja refeito toda vez que 
 * o componente renderizar.
 * Também evita que a variável ocupe um novo local na memória a cada renderização
 * 
 * Casos de uso
 * 1. Calculos pesados
 * 2. Igualdade refencial (quando passamos a informação para um componente filho)
 */

/**
 * -> useCallback
 * evita que a função seja recriada a cada redenrização,
 * o que pode ser um problema se a função for repassada para vários componentes
 * (context, prop drilling...)
 */