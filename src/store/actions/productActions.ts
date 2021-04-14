import { FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS } from './../constants/productConst';
import { Dispatch } from 'react';
import { ProductActions } from '../types/productT';
import { $host } from '../../http';






export const fetchProduct = (id: number) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: FETCH_PRODUCT });
      const response = await $host.get('api/device/' + id, {
        params: {
          id: id
        }
      });
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });

    } catch (e) {
      console.log(e);
    }
  }
} 