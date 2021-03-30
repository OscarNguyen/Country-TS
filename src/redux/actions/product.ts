import { FETCH_PRODUCT, CountryDataType, FETCH_ERROR, FETCH_SUCCESS } from '../../types';

export function fetchProduct() {
  return {
    type: FETCH_PRODUCT
  }
}

export function getDataSuccess(data: CountryDataType[]) {
  return {
    type: FETCH_SUCCESS,
    data
  }
}

export function getDataFail(error: Error) {
  return {
    type: FETCH_ERROR,
    error
  }
}

