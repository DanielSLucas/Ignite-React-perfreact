import React from 'react';
import { ProductItem } from './ProductItem';

type Product = {
  id: number,
  title: string;
  price: number;
}

// import { Container } from './styles';
interface SearchResultsProps {
  results: Product[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      {results.map(product => {
        return (
          <ProductItem product={product}/>
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