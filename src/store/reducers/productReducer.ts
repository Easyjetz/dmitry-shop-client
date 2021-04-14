import { FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR } from './../constants/productConst';
import { IProduct, ProductActions } from './../types/productT';

const initialState: IProduct = {
  loading: false,
  error: null,
  device: null
}

export const productReducer = (state: IProduct = initialState, action: ProductActions): IProduct => {
  switch (action.type) {

    case FETCH_PRODUCT:
      return { ...state, loading: true };
    
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, device: action.payload };

    case FETCH_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}