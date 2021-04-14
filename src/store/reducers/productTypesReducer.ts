import {
  FETCH_PRODUCT_T_ERROR,
  FETCH_PRODUCT_T_SUCCESS,
  FETCH_PRODUCT_TYPES
} from '../constants/productTypesConst';
import { ProductTypesAction } from '../types/productTypesT';
import { IProductTypes } from "../types/productTypesT";


const initialState: IProductTypes = {
  productTypes: [],
  loading: false,
  errors: null
}


export const productTypesReducer = (state: IProductTypes = initialState, action: ProductTypesAction): IProductTypes => {
  switch (action.type) {

    case FETCH_PRODUCT_TYPES:
      return { ...state, loading: true };
    
    case FETCH_PRODUCT_T_SUCCESS:
      return { ...state, loading: false, productTypes: action.payload };
    
    case FETCH_PRODUCT_T_ERROR:
      return { ...state, loading: false, errors: action.payload };
    
    default:
      return state;
  }
}