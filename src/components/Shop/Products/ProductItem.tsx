import React, { useContext } from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { BasketContext, IBasketItem } from '../../../context/basketContext'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IDevices } from '../../../store/types/shopT'


export const ProductItem: React.FC<IDevices> = ({ id, name, price, img, brandId, typeId, rating }) => {
  const { brands } = useTypedSelector(state => state.shop);

  const {items, addBasketItem } = useContext(BasketContext);

  const inBasket = items.reduce((acc: boolean, i: IBasketItem) => {
    return i.id === id ? true : acc
  }, false);

  const brandName = brands?.find(brand => brand.id === brandId).name;


  return (
  <Row className="productItem">
      <Col md={3}>
        <div className="productItem__imgBlock">
            <img src={img}  alt="" />
        </div>
      </Col>
      <Col className="productItem__info" md={6}>
        
        <NavLink to={`/device/${id}`}>

           <div>
             <p>{brands && `${brandName} ${name}`}</p>
           </div>
          
         </NavLink>
      </Col>
      <Col md={3}>
        <div className="productItem__footer"> 
          <p className="productItem__price">{`${new Intl.NumberFormat('ru-RU').format(price)} ₽`}</p>
          {inBasket === true ? 
            <Button className="productItem__inBasket"  variant="primary">В корзине</Button> :
            <Button onClick={() => addBasketItem({id, name, price, count: 1, img, brand: brandName})} variant="outline-primary">Купить</Button>
          }     
        </div>
      </Col>
  </Row>
  )
}