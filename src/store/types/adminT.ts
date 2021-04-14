import {
  CREATE_BRAND,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_ERROR,
  CLEAR_BRAND,
  CLEAR_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE_ERROR,
  CREATE_PRODUCT_TYPE_SUCCESS,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  CREATE_PRODUCT_ERROR
} from './../constants/adminConst';

export interface IAdmin {
  brandResponse: null | string;
  brandError: null | string;
  brandLoading: boolean;
  productTypeResponse: null | string;
  productTypeLoading: boolean;
  productTypeError: null | string;
  productResponse: string | null;
  productLoading: boolean;
  productError: string | null;
}

interface ICreateBrand {
  type: typeof CREATE_BRAND;
}

interface ICreateBrandSuccess {
  type: typeof CREATE_BRAND_SUCCESS;
  payload: string;
}

interface ICreateBrandError {
  type: typeof CREATE_BRAND_ERROR;
  payload: string;
}

interface IClearBrand {
  type: typeof CLEAR_BRAND;
}

interface ICreateProductType {
  type: typeof CREATE_PRODUCT_TYPE;
}

interface ICreateProductTypeError {
  type: typeof CREATE_PRODUCT_TYPE_ERROR;
  payload: string;
}

interface ICreateProductTypeSuccess {
  type: typeof CREATE_PRODUCT_TYPE_SUCCESS;
  payload: string;
}

interface IClearProductType {
  type: typeof CLEAR_PRODUCT_TYPE;
}


interface ICreateProduct {
  type: typeof CREATE_PRODUCT;
}

interface ICreateProductError {
  type: typeof CREATE_PRODUCT_ERROR;
  payload: string;
}

interface ICreateProductSuccess {
  type: typeof CREATE_PRODUCT_SUCCESS;
  payload: string;
}

interface IClearProduct {
  type: typeof CLEAR_PRODUCT;
}



export type AdminActions = 
  ICreateBrand | 
  ICreateBrandSuccess |
  ICreateBrandError |
  IClearBrand | 
  ICreateProductType |
  ICreateProductTypeError |
  ICreateProductTypeSuccess |
  IClearProductType |
  ICreateProduct |
  ICreateProductError |
  ICreateProductSuccess |
  IClearProduct