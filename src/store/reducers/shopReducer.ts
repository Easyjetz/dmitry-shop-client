import {
  FETCH_DEVICES,
  SET_TYPEID,
  FETCH_DEVICES_ERROR,
  FETCH_DEVICES_SUCCESS,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_ERROR,
  SET_PAGE
} from '../constants/shopConst';
import { IShop, ShopActions } from './../types/shopT';


const initialState: IShop = {
  typeId: false,
  brandId: false,
  limit: 9,
  page: 1,
  devices: null,
  brands: null,
  loadingDevice: false,
  loadingBrands: false,
  errorDevice: null,
  errorBrands: null,
}


export const shopReducer = (state: IShop = initialState, action: ShopActions): IShop => {
  switch (action.type) {
    case SET_TYPEID:
      return { ...state, typeId: action.payload };
    
    case FETCH_DEVICES:
      return { ...state, loadingDevice: true };
    
    case FETCH_DEVICES_SUCCESS:
      return { ...state, loadingDevice: false, devices: action.payload };
      
    case FETCH_DEVICES_ERROR:
      return { ...state, loadingDevice: false, errorDevice: action.payload };
    
    case FETCH_BRANDS:
      return { ...state, loadingBrands: true };
      
    case FETCH_BRANDS_SUCCESS:
      return { ...state, loadingBrands: false, brands: action.payload };
    
    case FETCH_BRANDS_ERROR:
      return { ...state, loadingBrands: false, errorBrands: action.payload };
    
    case SET_PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
}