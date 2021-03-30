import { ADD_PRODUCT, REMOVE_PRODUCT, CountryDataType } from '../../types';

export function addProduct(product: CountryDataType) {
  return {

    type: ADD_PRODUCT,
    product
  }
}

export function removeProduct(name: string) {
  return {
    type: REMOVE_PRODUCT,
    name
  }
}