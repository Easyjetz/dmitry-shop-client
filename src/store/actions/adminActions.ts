
import { AdminActions} from './../types/adminT';
import { Dispatch } from 'react';
import {
  CLEAR_BRAND,
  CREATE_BRAND,
  CREATE_BRAND_ERROR,
  CREATE_BRAND_SUCCESS,
  CLEAR_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE_ERROR,
  CREATE_PRODUCT_TYPE_SUCCESS,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  CREATE_PRODUCT_ERROR
} from '../constants/adminConst';
import { $host } from '../../http';

export const createConfig = () => {
  const USER_DATA = 'USER_DATA';
  const token = JSON.parse(localStorage.getItem(USER_DATA) || '{}').token;
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return config;
}


export const createBrand = (name: string) => {
  return async (dispatch: Dispatch<AdminActions>) => {
    try {
      const config = createConfig();
      dispatch({ type: CREATE_BRAND });
      const response = await $host.post('api/brand', { name }, config);
      dispatch({ type: CREATE_BRAND_SUCCESS, payload: response.data.message });

    } catch (e) {
      dispatch({ type: CREATE_BRAND_ERROR, payload: e.response.data.message });
    }
  }
}

export const clearBrand = () => {
  return (dispatch: Dispatch<AdminActions>) => dispatch({ type: CLEAR_BRAND });
}

export const createProductType = (name: string) => {
  return async (dispatch: Dispatch<AdminActions>) => {
    try {
      const config = createConfig();
      dispatch({ type: CREATE_PRODUCT_TYPE});
      const response = await $host.post('api/type', { name }, config);
      dispatch({ type: CREATE_PRODUCT_TYPE_SUCCESS, payload: response.data.message });
    } catch (e) {
      dispatch({ type: CREATE_PRODUCT_TYPE_ERROR, payload: e.response.data.message });
    }
  }
}

export const clearProductType = () => {
  return (dispatch: Dispatch<AdminActions>) => dispatch({ type: CLEAR_PRODUCT_TYPE });
}



export const createProduct = (formData: FormData) => {
  return async (dispatch: Dispatch<AdminActions>) => {
    try {
      dispatch({ type: CREATE_PRODUCT });
      const config = createConfig();
      const response = await $host.post('api/device', formData, config);
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data.message });
    } catch (e) {
      dispatch({ type: CREATE_PRODUCT_ERROR, payload: e.response.data.message });
    }
  }

}

export const clearProduct = () => (dispatch: Dispatch<AdminActions>) => dispatch({ type: CLEAR_PRODUCT });