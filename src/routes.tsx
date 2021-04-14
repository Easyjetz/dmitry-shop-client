import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Admin } from './components/Admin/Admin';
import { Auth } from './components/Auth/Auth';
import { Basket } from './components/Basket/Basket';
import { ProductInfo } from './components/ProductInfo/ProductInfo';
import { Shop } from './components/Shop/Shop';

export const useRoutes = (isAuth: boolean) => {
  return (
    <Switch>
      <Route path="/basket" exact>
        <Basket />
      </Route>
      <Route path="/" exact>
        <Shop />
      </Route>
      <Route path="/device/:id" exact>
        <ProductInfo />
      </Route>
      <Route path="/admin" exact>
        <Admin />
      </Route>
      { !isAuth && <> 
        <Route path="/regist" exact>
          <Auth />
        </Route>
        <Route path="/login" exact>
          <Auth />
        </Route> </> }
      <Redirect to="/" />
    </Switch>
  )
}