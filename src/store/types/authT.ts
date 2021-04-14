import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT
} from './../constants/authConst';

export interface IAuth {
  registrationLoading: boolean;
  registraitonMessage: string | null;
  loginLoading: boolean;
  token: string | null;
  registrationError: string | null;
  loginError: string | null;
  role: string | null;
}

interface IDataLogin {
  token: string;
  role: string;
}


interface IRegistration {
  type: typeof REGISTRATION;
}

interface IRegistrationSuccess {
  type: typeof REGISTRATION_SUCCESS;
  payload: string;
}

interface IRegistrationError {
  type: typeof REGISTRATION_ERROR;
  payload: string;
}

interface IUserLogin {
  type: typeof USER_LOGIN;
}

interface IUserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: IDataLogin;
}

interface IUserLoginError {
  type: typeof USER_LOGIN_ERROR;
  payload: string;
}

interface IUserLogout {
  type: typeof USER_LOGOUT;
}


export type AuthActions =
  IRegistration |
  IRegistrationSuccess |
  IRegistrationError |
  IUserLogin |
  IUserLoginSuccess |
  IUserLoginError |
  IUserLogout;