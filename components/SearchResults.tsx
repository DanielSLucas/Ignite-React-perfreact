import { List, ListRowRenderer } from 'react-virtualized';
import React, { useMemo } from 'react';
import { ProductItem } from './ProductItem';

type Product = {
  id: number,
  title: string;
  price: number;
  priceFormatted: string;
}

interface SearchResultsProps {
  results: Product[];
  totalPrice: number;
  onAddToWishList(id: number): Promise<void>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, totalPrice,onAddToWishList }) => {
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0)
  // }, [results])
  
  // -> Virtualização
  // Evita que tudo seja carregado em tela de uma vez, carregando somente o que será exibido
  // conforme o scroll do usuário
  // https://bvaughn.github.io/react-virtualized/#/components/List

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem           
          product={results[index]} 
          onAddToWishList={onAddToWishList} 
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List 
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      {/* {results.map(product => {
        return (
          <ProductItem 
            key={product.id}
            product={product} 
            onAddToWishList={onAddToWishList} 
          />
        );
      })} */}
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

/**
 * -> Formatação de dados
 * preferir fazer a formatação de dados no momento em que eles são buscados/alterados
 * ao invés de fazer a formatação na hora da renderização ou em um useMemo
 */

/**
 * https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
 * Bundle analyzer
 * Permite analizar o impacto que cada lib tem no bundle final
 * Como no caso, a utilização do Lodash tem em nosso projeto
 * executar:
 * ANALYZE=true yarn build
 * vai gerar um html que utilizaremos para analisar os tamanhos
 */