const requestProducts = (page, category) => ({
  type: 'REQUEST_PRODUCTS',
  page,
  category,
});

const receiveProducts = (page, category, response) => ({
  type: 'RECEIVE_PRODUCTS',
  page,
  category,
  response,
});

const fetchProducts = (page, category) => async dispatch => {
  dispatch(requestProducts);

  const response = await api.get(
    `/products/?category=${category}&_embed=options&_page=${page}&_limit=${
      this.state.productsPerPage
    }`
  );

  return dispatch(receiveProducts(page, category, response.data));
};
