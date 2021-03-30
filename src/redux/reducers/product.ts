import {
  ProductActions,
  CountryDataType,
  FETCH_PRODUCT,
  FETCH_ERROR, FETCH_SUCCESS
} from '../../types'

const initialState: { items: CountryDataType[], error: Error | null } = {
  items: [],
  error: null
}

export default function productReducer(state = initialState, action: ProductActions) {
  switch (action.type) {

    case FETCH_PRODUCT: {
      return { ...state, error: null }
    }

    case FETCH_SUCCESS: {
      return {
        ...state, items: action.data, error: null
      }
    }

    case FETCH_ERROR: {
      return {
        ...state, error: action.error, items: []
      }
    }

    default: {
      return state;
    }
  }
}
