// Actions
export const SELECT_FOR_RENT = 'SELECT_FOR_RENT';
export const SELECT_FOR_SALE = 'SELECT_FOR_SALE';

// Reducer
export const changeIconReducer = (state, action) => {
  switch (action.type) {
    case SELECT_FOR_RENT:
      return {
        selectedIcon: 'isForRent',
      };
    case SELECT_FOR_SALE:
      return {
        selectedIcon: 'isForSale',
      };
    default:
      return state;
  }
};

