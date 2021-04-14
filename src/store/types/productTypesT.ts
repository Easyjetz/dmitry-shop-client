import {FETCH_PRODUCT_TYPES, FETCH_PRODUCT_T_ERROR, FETCH_PRODUCT_T_SUCCESS } from '../constants/productTypesConst';

export interface IProductTypes {
  productTypes: any[];
  loading: boolean;
  errors: null | string;
}

export interface IFetchProductTypes {
  type: typeof FETCH_PRODUCT_TYPES;

}

export interface IFetchProductTSuccess {
  type: typeof FETCH_PRODUCT_T_SUCCESS;
  payload: any[];
}

export interface IFetchProductTError {
  type: typeof FETCH_PRODUCT_T_ERROR;
  payload: string;
}

export type ProductTypesAction = IFetchProductTypes | IFetchProductTSuccess | IFetchProductTError;

