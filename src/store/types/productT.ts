import { FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR } from "../constants/productConst";


interface IDeviceInfo {
  id: number;
  title: string;
  description: string;
}


interface IDevice {
  brandId: number;
  id: number;
  img: string;
  name: string;
  price: number;
  rating: number;
  typeId: number;
  info: IDeviceInfo[];
}


export interface IProduct {
  loading: boolean;
  error: string | null;
  device: IDevice | null;
}

interface IFetchProduct {
  type: typeof FETCH_PRODUCT;
}

interface IFetchProductSuccess {
  type: typeof FETCH_PRODUCT_SUCCESS;
  payload: IDevice;
}

interface IFetchProductError {
  type: typeof FETCH_PRODUCT_ERROR;
  payload: string;
}

export type ProductActions =
  IFetchProduct |
  IFetchProductSuccess |
  IFetchProductError