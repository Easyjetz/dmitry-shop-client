import { createContext } from "react";


export type AuthContextProps = {
  userToken: string | null;
  userRole: string | null;
  userLogin: (token: string, role: string) => void;
  userLogOut: () => void;
}


export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  userRole: null,
  userLogin: (token: string, role: string) => { },
  userLogOut: () => { },
});