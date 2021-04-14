import { FETCH_DEVICES, SET_TYPEID, FETCH_DEVICES_SUCCESS, FETCH_DEVICES_ERROR, FETCH_BRANDS, FETCH_BRANDS_SUCCESS, FETCH_BRANDS_ERROR, SET_PAGE } from './../constants/shopConst';


export interface IDevices {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  brandId: number;
  typeId: number;
}

export interface IDevicesResponse {
  count: number;
  rows: IDevices[];
}

export interface IShop {
  typeId: boolean | number,
  brandId: boolean | number,
  limit: number,
  page: number,
  loadingDevice: boolean,
  loadingBrands: boolean,
  devices: IDevicesResponse | null;
  errorDevice: string | null;
  errorBrands: string | null;
  brands: any[] | null;
}


interface IShopSetTypeId {
  type: typeof SET_TYPEID;
  payload: number | boolean;
}


interface IShopFetchDevices {
  type: typeof FETCH_DEVICES;
}

interface IShopFetchDevicesSuccess {
  type: typeof FETCH_DEVICES_SUCCESS;
  payload: IDevicesResponse;
}

interface IShopFetchDevicesError {
  type: typeof FETCH_DEVICES_ERROR;
  payload: string;
}

interface IShopFetchBrands {
  type: typeof FETCH_BRANDS;
}

interface IShopFetchBrandsSuccess {
  type: typeof FETCH_BRANDS_SUCCESS;
  payload: any[];
}

interface IShopFetchBrandsError {
  type: typeof FETCH_BRANDS_ERROR;
  payload: string;
}

interface IShopSetPage {
  type: typeof SET_PAGE;
  payload: number;
}



export type ShopActions =
  IShopSetTypeId |
  IShopFetchDevices |
  IShopFetchDevicesSuccess |
  IShopFetchDevicesError |
  IShopFetchBrands |
  IShopFetchBrandsSuccess |
  IShopSetPage |
  IShopFetchBrandsError;