import api from '../api';
import { requestProducts, receiveProducts } from './actionCreator';

export const fetchProducts = (
  page,
  category = null,
  productsPerPage
) => async dispatch => {
  dispatch(requestProducts);

  const hasCategory = category !== 'all' ? `category=${category}&` : '';
  const hasPage = page ? `_page=${page}` : '';

  const response = await api.get(
    `/products/?${hasCategory}_embed=options&${hasPage}&_limit=${productsPerPage}`
  );

  const products = response.data;
  const totalCount = parseInt(response.headers['x-total-count']);

  return dispatch(receiveProducts(page, category, products, totalCount));
};
