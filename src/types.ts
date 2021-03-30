// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
// Enum
// export enum DialogType {
//   SignIn = 'signIn',
//   SignUp = 'signUp',
// }

// A product
// export type Product = {
//   id: string
//   name: string
//   price: number
// }

// export type AddProductAction = {
//   type: typeof ADD_PRODUCT
//   payload: {
//     product: Product,
//   }
// }

// export type RemoveProductAction = {
//   type: typeof REMOVE_PRODUCT
//   payload: {
//     product: Product,
//   }
// }
export type AddProductAction = {
  type: typeof ADD_PRODUCT
  product:CountryDataType
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  name:string
}

export type GetProductAction={
  type:typeof GET_PRODUCT,
 // data:CountryDataType[]
}
export type FetchProductAction={
  type:typeof FETCH_PRODUCT,
  
}
export type FetchProductSuccessAction={
  type:typeof FETCH_SUCCESS,
  data:CountryDataType[]
  
}
export type FetchProductFailAction={
  type:typeof FETCH_ERROR,
  error:Error
}
// export type ToggleDialogAction = {
//   type: typeof TOGGLE_DIALOG
//   payload: {
//     dialog: DialogType,
//   }
// }

// export type UiActions = ToggleDialogAction

// Use this union in reducer
export type CartActions =
  | AddProductAction
  | RemoveProductAction

export type ProductActions =
   GetProductAction|FetchProductAction|FetchProductSuccessAction|FetchProductFailAction
 

// export type ProductState = {
//   inCart: Product[]
// }
export type CartState = {
  
    items:CountryDataType[],quantity:number
  
}
export type ProductState = {
  
    items:CountryDataType[],
    error:Error|null
  
}
export type initialState = {items:CountryDataType[],quantity:number}
// Using dynamic keys from an enum
// export type UiState = {
//   dialogOpen: {
//     [key in DialogType]?: boolean
//   }
// }

// export type AppState = {
//   product: ProductState,
//   ui: UiState,
// }
export type AppState = {
  cart: CartState,
  product:ProductState,
  //persistedState:any
}

// export type newCountryDataType = CountryDataType &{
//   added:boolean
// }

export type CountryDataType = {
  flag:string,
  name:string,
  languages:Language[],
  population:number,
  region:string,
  added:boolean,
  capital:string
  
} & {[type:string]:string|number|Language[]|boolean}

export type Language={
  name:string
}

export type Theme = {
  headerBackground:string,
  headerColor:string,
  contentBackground:string,
  contentColor:string,
  borderBottomColor:string,
  boxShadow: string,
  addIconColor: string,
  color:string,
  [value:string]:string,
}