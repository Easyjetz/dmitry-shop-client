import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './components/NavBar/Navbar';
import { useRoutes } from './routes';
import './index.sass';
import './media.sass';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './context/authContext';
import { BasketContext } from './context/basketContext';
import { useBasket } from './hooks/useBasket';
import { checkToken } from './store/actions/authActions';



function App() {
  const { userLogOut, userLogin, userToken, userRole } = useAuth();
  const {items, addBasketItem, deleteBasketItem, setProductCount } = useBasket();
  const routes = useRoutes(!!userToken);

  useEffect(() => {
    checkToken().then(data => {
      if (data) {
        userLogin(data.token, data.role);
      } else {
        userLogOut();
      }
    });
  }, []);
  

  return (
    <Router>
      <> 
        <AuthContext.Provider value={{ userToken, userRole, userLogin, userLogOut }}>
          <BasketContext.Provider value={{items, addBasketItem, deleteBasketItem, setProductCount}}>
            <NavBar />
            <Container>
              {routes}
            </Container> 
            </BasketContext.Provider>
      </AuthContext.Provider>
      </>
    </Router>
  );
}

export default App;
