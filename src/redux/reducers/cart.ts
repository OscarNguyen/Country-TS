import { ADD_PRODUCT, REMOVE_PRODUCT, CountryDataType, CartActions } from '../../types';

const initialState: { items: CountryDataType[], quantity: number } = {
  items: [],
  quantity: 0
}

export default function cartReducer(state = initialState, action: CartActions) {

  switch (action.type) {
    case ADD_PRODUCT: {
      return { ...state, items: state.items.concat(action.product), quantity: state.items.length + 1 }
    }

    case REMOVE_PRODUCT: {
      const remainingQuantity = state.items.filter(item => item.name !== action.name).length;
      return { ...state, items: state.items.filter(item => item.name !== action.name), quantity: remainingQuantity }
    }

    default: {
      return state;
    }
  }
}