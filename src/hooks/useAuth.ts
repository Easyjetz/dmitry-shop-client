import { useEffect, useState } from "react";



export const useAuth = () => {
  const [userToken, setUserToken] = useState<null | string>(null);
  const [userRole, setUserRole] = useState<null | string>(null);
  const USER_DATA = 'USER_DATA';

  const userLogin = (token: string, role: string) => {
    if (token && role) {
      setUserToken(token);
      setUserRole(role);
      localStorage.setItem(USER_DATA, JSON.stringify({token, role})); 
    }
  }

  const userLogOut = () => {
    localStorage.removeItem(USER_DATA);
    setUserToken(null);
    setUserRole(null);
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(USER_DATA) || '{}');
    if (userData) {
      userLogin(userData.token, userData.role);
    }

  }, [userLogin]);

  return { userToken, userLogin, userLogOut, userRole };

} 