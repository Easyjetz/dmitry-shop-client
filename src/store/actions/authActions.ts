import { createConfig } from './adminActions';
import { AuthActions } from './../types/authT';
import jwt_decode from 'jwt-decode';
import { Dispatch } from 'react';
import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  REGISTRATION_ERROR,
  USER_LOGIN_ERROR
} from '../constants/authConst';
import { $host } from '../../http';





interface IDecode {
  role: string;
}


export const authRegistration = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: REGISTRATION });
      const response = await $host.post('api/user/registration', {
        email,
        password
      });
      dispatch({ type: REGISTRATION_SUCCESS, payload: response.data.message });
    } catch (e) {
      dispatch({ type: REGISTRATION_ERROR, payload: e.response.data.message }); 
    }
  }
}


export const authLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActions>) =>   {
    try {
      dispatch({ type: USER_LOGIN });
      console.log(process.env.NODE_ENV, $host);
      const response = await $host.post('api/user/login', {
        email,
        password
      });
      const decode: IDecode = jwt_decode(response.data.token);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: {token: response.data.token, role: decode.role}});

    } catch (e) {
      dispatch({ type: USER_LOGIN_ERROR, payload: e.response.data.message });
    }
  }
}

export const checkToken = async () => {
    try {
      const config = createConfig();
      const response = await $host.get('api/user/auth', config);
      const decode: IDecode = jwt_decode(response.data.token);
      return {token: response.data.token, role: decode.role };
    } catch (e) {
      console.log(e);
  }
}


export const userLogout = () => {
  return (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: USER_LOGOUT });
    } catch (e) {
      console.log(e);
    }
  }
}