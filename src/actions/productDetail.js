import api from '../api';
import { requestItemDetail, receiveItemDetail } from './actionCreator';

export const fetchItemDetail = productId => async (dispatch, getState) => {
  dispatch(requestItemDetail());

  const response = await api.get('products/' + productId, {
    params: {
      _embed: 'options',
    },
  });
  const product = response.data;

  return dispatch(receiveItemDetail(product));
};
