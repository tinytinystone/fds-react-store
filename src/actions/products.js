import api from '../api';
import { requestProducts, receiveProducts } from './actionCreator';

export const fetchProducts = (
  category,
  page = null,
  productsPerPage = null
) => async dispatch => {
  dispatch(requestProducts());

  const hasCategory = category !== 'all' ? `category=${category}&` : '';
  const hasPage = page ? `_page=${page}` : '';
  const hasProductsPerPage = productsPerPage
    ? `&_limit=${productsPerPage}`
    : '';

  const response = await api.get(
    `/products/?${hasCategory}_embed=options&${hasPage}${hasProductsPerPage}`
  );

  const products = response.data;
  const totalCount =
    productsPerPage && parseInt(response.headers['x-total-count']);

  return dispatch(receiveProducts(products, category, totalCount, page));
};

export const fetchProductsForCart = params => async dispatch => {
  dispatch(requestProducts());
  const { data: products } = await api.get('products', {
    params,
  });
  dispatch(receiveProducts(products, 'cartList', products.length));
};
