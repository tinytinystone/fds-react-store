// const byProductId = (state = {}, action) => {
//   switch (action.type) {
//     case 'RECEIVE_PRODUCTS':
//       const nextState = { ...state };
//       action.products.forEach(product => {
//         nextState[product.id] = product;
//       });
//       return nextState;
//     default:
//       return state;
//   }
// };

// export default byProductId;

// export const getProduct = (state, id) => state[id];

const byProductId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.products,
    };
  }
  return state;
};

export default byProductId;

export const getProduct = (state, id) => state[id];
