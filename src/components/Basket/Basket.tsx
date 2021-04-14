import React, { useContext } from 'react';
import { Col, Button, Row, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { BasketContext, IBasketItem } from '../../context/basketContext';
import { IconContext } from 'react-icons'
import {TiDelete} from 'react-icons/ti'
import { useMediaQuery } from 'react-responsive';

export const Basket = () => {

  
  const { items, deleteBasketItem, setProductCount } = useContext(BasketContext);
  
  const sum = items.reduce((acc: number, i: IBasketItem) => acc + (i.count * i.price), 0);

  const updateCountHandlet = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const count = e.currentTarget.value.replace(/[^\d]/g, '');
    setProductCount(id, Number(count));
  }

  const isSmScreen = useMediaQuery({ query: "(max-width: 768px)" });



  return (
    <div className="Basket">
      <h4 className="Basket__title">Корзина</h4>
      <Row className="Basket__wrap">
        <Col lg={8}>
          {items.map(({ id, name, brand, img, count, price }) => {
            return (
              <Row className="productItem" key={id}>
                <Col md={3}>
                  <div className="productItem__imgBlock">
                    <Image src={process.env.REACT_APP_API_URL + img} width={171} height={180} rounded alt="" />
                  </div>
                </Col>
                <Col className="productItem__info" md={5}>  
                  <NavLink to={`/device/${id}`}>
                    <div>
                      <p>{`${brand} ${name}`}</p>
                    </div>
                  </NavLink>
                </Col>
                <Col className="Counter" md={2}>
                  <div className="Counter__wrap">
                    <button onClick={() => setProductCount(id, count - 1)} className="Counter__minus">-</button>
                    <input onChange={(e) => updateCountHandlet(id, e)} value={count} />
                    <button onClick={() => setProductCount(id, count + 1)}  className="Counter__plus">+</button>
                  </div>
                  {count > 1 && <span className="Counter__price">{`${new Intl.NumberFormat('ru-RU').format(price)} ₽ / шт.`}</span>}
                </Col>
                <Col md={2} className="Basket__price">
                  {!isSmScreen &&
                    <IconContext.Provider value={{ color: "#ff0000", className: "Basket__delete" }}>
                      <TiDelete onClick={() => deleteBasketItem({ id, name, price, count, brand, img })} />
                    </IconContext.Provider>
                  }
                  {isSmScreen && <div onClick={() => deleteBasketItem({ id, name, price, count, brand, img })}>Удалить</div>}
                  <span className="productItem__price">{`${new Intl.NumberFormat('ru-RU').format(price * count)} ₽`}</span>
                </Col>
            </Row>)})
          }
        </Col>
        <Col lg={4}>
          <div className="Product__wrapper Booking">
            <span className="Booking__text">{`Итого: ${new Intl.NumberFormat('ru-RU').format(sum)} ₽`}</span>
          </div>
          <Button className="Booking__btn" variant="primary">Оформить заказ</Button>
        </Col>
      </Row>
    </div>
  )
}