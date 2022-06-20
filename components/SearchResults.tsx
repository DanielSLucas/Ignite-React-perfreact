import React from 'react';
import ProductItem from './ProductItem';

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