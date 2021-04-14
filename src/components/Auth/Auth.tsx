import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { authLogin, authRegistration } from '../../store/actions/authActions';
import { Message } from '../Message/Message';



export const Auth: React.FC = () => {

  const { pathname } = useLocation();
  const loginPath = pathname === '/login';

  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  const { token, role, registraitonMessage, registrationError, loginError } = useTypedSelector(state => state.auth);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (registraitonMessage) {
      setMessage(registraitonMessage);
    } else if (registrationError) {
      setMessage(registrationError);
    }

  }, [registraitonMessage, registrationError])

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }


  const authHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loginPath) {
      dispatch(authLogin(email, password));
    } else {
      dispatch(authRegistration(email, password));
    }
  }

  useEffect(() => {
    if (token && role) {
      auth.userLogin(token, role);
    }
  }, [token])
  
  return (
    <div className="Auth">
      {message && !loginPath &&
        <Message success={registraitonMessage ? true : false} message={message} />
      }
      {loginError && loginPath && <Message success={false} message={loginError} />}
      <h2 className="Auth__title">
          {loginPath ? 'Вход' : 'Регистрация'}
      </h2>
      <Form>
        <Form.Group>
          <Form.Label>Введите email</Form.Label>
          <Form.Control className="Auth__input" type="email" onChange={emailHandler} value={email} placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Введите пароль</Form.Label>
          <Form.Control className="Auth__input" type="password" onChange={passwordHandler} value={password} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" onClick={authHandler} className="Auth__button">
          {loginPath ? 'Войти' : 'Зарегистрироваться'}
        </Button>
          {loginPath ? 
            <div className="Auth__footer">
              <span>Нет аккаунта?</span>
              <NavLink className="Auth__link" to="/regist">Создать новый аккаунт</NavLink>
            </div>
            :
            <div className="Auth__footer">
              <span>Уже есть аккаунт?</span>
              <NavLink className="Auth__link" to="/login">Войти</NavLink>
            </div>
          }
      </Form>
    </div>
  )
}