import { ProductTypesAction } from '../types/productTypesT';
import { Dispatch } from 'react';
import { FETCH_PRODUCT_TYPES, FETCH_PRODUCT_T_SUCCESS } from '../constants/productTypesConst';
import { $host } from '../../http';

// обработать ошибку


export const fetchProductTypes = () => {
  return async (dispatch: Dispatch<ProductTypesAction>) => {
    try {
      dispatch({ type: FETCH_PRODUCT_TYPES });

      const response = await $host.get('api/type');
      dispatch({ type: FETCH_PRODUCT_T_SUCCESS, payload: response.data });

    } catch (e) {
      console.log(e);
      
    }
  }
}