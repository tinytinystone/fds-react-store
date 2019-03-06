import api from '../api';
import { fetchProductsRequest, fetchProductsSuccess } from './actionCreator';
import { schema, normalize } from 'normalizr';
import { getIsFetching } from '../reducers/createList';

export const product = new schema.Entity('products');
export const arrayOfProducts = [product];

export const fetchProducts = (
  category,
  page = null,
  productsPerPage = null,
  productId = null
) => async (dispatch, getState) => {
  if (getIsFetching(getState(), category)) {
    return Promise.resolve();
  }
  try {
    dispatch(fetchProductsRequest());
    let response;

    if (productId) {
      response = await api.get(`/products/${productId}?_embed=options`);
      console.log(response);
    } else {
      const hasCategory = category !== 'all' ? `category=${category}&` : '';
      const hasPage = page ? `_page=${page}` : '';
      const hasProductsPerPage = productsPerPage
        ? `&_limit=${productsPerPage}`
        : '';

      response = await api.get(
        `/products/?${hasCategory}_embed=options&${hasPage}${hasProductsPerPage}`
      );
    }

    const products = Array.isArray(response.data)
      ? response.data
      : [response.data];
    const totalCount =
      productsPerPage && parseInt(response.headers['x-total-count']);

    return dispatch(
      fetchProductsSuccess(
        normalize(products, arrayOfProducts),
        category,
        totalCount,
        page
      )
    );
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILTURE',
    });
  }
};

export const fetchProductsForCart = params => async dispatch => {
  dispatch(fetchProductsRequest());
  const { data: products } = await api.get('products', {
    params,
  });
  dispatch(fetchProductsSuccess(products, 'cartList', products.length));
};
