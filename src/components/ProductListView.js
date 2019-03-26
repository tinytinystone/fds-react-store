import React from 'react';
import s from './ProductListView.module.scss';

import withLoading from '../hoc/withLoading';

import ProductItem from './ProductItem';
import ProductListPage from './ProductListPage';

const ProductListView = ({
  productList,
  currentCategory,
  pageNumbers,
  isFetching,
}) => {
  if (isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <section className={s.list}>
          {productList.map(product => {
            return <ProductItem product={product} key={product.id} />;
          })}
        </section>
        <ul className={s.pageNumbers}>
          {pageNumbers.map(number => {
            return (
              <ProductListPage
                key={number}
                number={number}
                currentCategory={currentCategory}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
};

export default withLoading(ProductListView);
