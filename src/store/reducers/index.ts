import { productReducer } from './productReducer';
import { adminReducer } from './adminReducer';
import { authReducer } from './authReducer';
import { shopReducer } from './shopReducer';
import { combineReducers } from "redux";
import { productTypesReducer } from "./productTypesReducer";


export const rootReducer = combineReducers({
  productTypes: productTypesReducer,
  shop: shopReducer,
  auth: authReducer,
  admin: adminReducer,
  product: productReducer,
});