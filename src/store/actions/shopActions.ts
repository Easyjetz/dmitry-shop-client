
import { Dispatch } from 'react';
import { $host } from '../../http';
import { ShopActions } from '../types/shopT';
import { FETCH_DEVICES, SET_TYPEID, FETCH_DEVICES_SUCCESS, FETCH_BRANDS, FETCH_BRANDS_SUCCESS, SET_PAGE } from './../constants/shopConst';



export const shopSetTypeId = (typeId: number | boolean) => ({ type: SET_TYPEID, payload: typeId });

// обработать ошибку
export const fetchDevices = (page: number, limit: number, typeId?: number | boolean, brandId?: number | boolean) => {
  return async (dispatch: Dispatch<ShopActions>) => {
    try {
      dispatch({ type: FETCH_DEVICES });

    const response = await $host.get('api/device', {
      params: {
        typeId,
        brandId: brandId,
        page,
        limit
      }
    });

    dispatch({ type: FETCH_DEVICES_SUCCESS, payload: response.data });

    } catch (e) {
      console.log(e);
    }
  }
}

export const fetchBrands = () => {
  return async (dispatch: Dispatch<ShopActions>) => {
    try {
      dispatch({ type: FETCH_BRANDS });

      const response = await $host.get('api/brand');

      dispatch({ type: FETCH_BRANDS_SUCCESS, payload: response.data });
      return response.data;

    } catch (e) {
      console.log(e);
    }
  }
}


export const setPage = (page: number) => (dispatch: Dispatch<ShopActions>) => dispatch({type: SET_PAGE, payload: page})