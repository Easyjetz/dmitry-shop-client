import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { IconContext } from "react-icons";
import {FaShoppingBag, FaShoppingBasket} from 'react-icons/fa'
import { AuthContext } from '../../context/authContext';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/actions/authActions';
import { shopSetTypeId } from '../../store/actions/shopActions';
import { BasketContext } from '../../context/basketContext';



export const NavBar: React.FC = () => {

  const auth = useContext(AuthContext);
  const authenticated = !!auth.userToken;
  const dispatch = useDispatch();

  const { items } = useContext(BasketContext);
  
  const itemsCount = items.reduce((acc, i) => acc + i.count, 0);

  const isAdmin = auth.userRole === 'ADMIN';

  const logoutHandler = () => {
    auth.userLogOut();
    dispatch(userLogout());
  }

  const setTypeId = () => {
    dispatch(shopSetTypeId(false));
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">
              <IconContext.Provider value={{size: '28px', className: "Navbar__logo"}}>
                <FaShoppingBag onClick={setTypeId} />
              </IconContext.Provider>
            </NavLink>
          </Navbar.Brand>
          <Nav className="mr-right">
            {itemsCount > 0 && <span className="Navbar__basketCount" >{itemsCount}</span>}
            <NavLink className="NavLinkItem__basketIcon" to="/basket">
              <IconContext.Provider value={{ size: '24px' }}>
                <FaShoppingBasket />
              </IconContext.Provider>
            </NavLink>
            {isAdmin && <NavLink className="NavLinkItem" to="/admin">Админ панель</NavLink>}
            {!authenticated ? <>
              <NavLink className="NavLinkItem" to="/login">Вход</NavLink>
              <NavLink className="NavLinkItem" to="/regist">Регистрация</NavLink>
            </> : 
              <li className="NavLinkItem" onClick={logoutHandler}>Выйти</li>
            }
          </Nav>  
        </Container>
      </Navbar>
    </>
  )
}