import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios';

import {
  FETCH_PRODUCT,
  CountryDataType,
} from '../../types'
import { getDataFail, getDataSuccess } from '../actions/product';

function* getProducts() {
  try {
    const result = yield call(axios.get, "https://restcountries.eu/rest/v2/all");
    const products: CountryDataType[] = result.data;
    const fetchedProduct: CountryDataType[] = products!.map(item => {
      return {
        ...item,
        added: false
      }
    })
    yield put(getDataSuccess(fetchedProduct));
  } catch (error) {
    yield put(getDataFail(error));
  }
}

function* saveState() {
  const state = yield select();
  yield localStorage.setItem('state', JSON.stringify(state));
}
export default [
  takeLatest(FETCH_PRODUCT, getProducts),
  takeLatest('*', saveState),
]