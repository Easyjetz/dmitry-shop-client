import {
  CLEAR_BRAND,
  CREATE_BRAND,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_ERROR,
  CLEAR_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE_ERROR,
  CREATE_PRODUCT_TYPE_SUCCESS,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  CREATE_PRODUCT_ERROR
} from './../constants/adminConst';
import { AdminActions } from './../types/adminT';
import { IAdmin } from "../types/adminT";

const initialState: IAdmin = {
  brandResponse: null,
  brandError: null,
  brandLoading: false,
  productTypeResponse: null,
  productTypeError: null,
  productTypeLoading: false,
  productResponse: null,
  productLoading: false,
  productError: null
}

export const adminReducer = (state: IAdmin = initialState, action: AdminActions): IAdmin  => {
  switch (action.type) {
    case CREATE_BRAND:
      return { ...state, brandLoading: true };
    
    case CREATE_BRAND_SUCCESS:
      return { ...state, brandLoading: false, brandResponse: action.payload };
    
    case CREATE_BRAND_ERROR:
      return { ...state, brandLoading: false, brandError: action.payload };

    
    case CLEAR_BRAND:
      return { ...state, brandResponse: null };
    
    case CREATE_PRODUCT_TYPE:
      return { ...state, productTypeLoading: true };
    
    case CREATE_PRODUCT_TYPE_ERROR:
      return { ...state, productTypeLoading: false, productTypeError: action.payload };
    
    case CREATE_PRODUCT_TYPE_SUCCESS:
      return { ...state, productTypeLoading: false, productTypeResponse: action.payload };
    
    case CLEAR_PRODUCT_TYPE:
      return { ...state, productTypeResponse: null };
    
    case CREATE_PRODUCT:
      return { ...state, productLoading: true };
    
    case CREATE_PRODUCT_ERROR:
      return { ...state, productError: action.payload, productLoading: false };
    
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, productLoading: false, productResponse: action.payload };
    
    case CLEAR_PRODUCT:
      return { ...state, productResponse: null, productError: null };
    
    default:
      return state;
  }
}


