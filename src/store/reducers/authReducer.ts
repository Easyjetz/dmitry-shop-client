import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT
} from '../constants/authConst';
import { IAuth, AuthActions } from './../types/authT';


const initialState: IAuth = {
  registrationLoading: false,
  registraitonMessage: null,
  loginLoading: false,
  token: null,
  registrationError: null,
  loginError: null,
  role: null
}

// здесь повторяется код, хз шо с этим делать и насколько это норм вообще
export const authReducer = (state: IAuth = initialState, action: AuthActions): IAuth => {
  switch (action.type) {
    case REGISTRATION:
      return { ...state, registrationLoading: true };
    case REGISTRATION_SUCCESS:
      return { ...state, registrationLoading: false, registraitonMessage: action.payload };
    case REGISTRATION_ERROR:
        return { ...state, registrationLoading: false, registrationError: action.payload };

    case USER_LOGIN:
      return { ...state, loginLoading: true };
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        token: action.payload.token,
        role: action.payload.role,
        registraitonMessage: null,
        registrationError: null,
        loginError: null
      };
    
    case USER_LOGIN_ERROR:
      return { ...state, loginLoading: false, loginError: action.payload };
    
    case USER_LOGOUT:
      return { ...state, token: null };

    default:
      return state;
  }
}


