import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchProduct } from '../../store/actions/productActions';
import { fetchProductTypes } from '../../store/actions/productTypesActions';
import { fetchBrands } from '../../store/actions/shopActions';
import { Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { BasketContext, IBasketItem } from '../../context/basketContext';




export const ProductInfo = () => {

  const { device } = useTypedSelector(state => state.product);

  const { brands } = useTypedSelector(state => state.shop);
  const { productTypes} = useTypedSelector(state => state.productTypes);
  const params: {id: string} = useParams();
  const dispatch = useDispatch();
  const {items, addBasketItem } = useContext(BasketContext);

  const inBasket = items.reduce((acc: boolean, i: IBasketItem) => {
    return i.id === device?.id ? true : acc
  }, false);

  useEffect(() => {
    if (!brands) {
      dispatch(fetchBrands());
    }

    if (!productTypes) {
      dispatch(fetchProductTypes());
    }
    dispatch(fetchProduct(Number(params.id)));
  }, []);

  const productBrand = brands?.find(brand => brand.id === device?.brandId);

  const addBasketItemHandler = (name: string, price: number, count: number, img: string, brand: string, id: number) => {
    addBasketItem({ name, price, count, img, brand, id });
  }


  const shortDescription = [];

  for (let items = 0; items < 3; items++) {
    if (device?.info[items]) {
      shortDescription.push(device?.info[items]);
    }
  }
  return (
    <>
      {device && brands && productTypes &&
        <div className="Product">
          <h3 className="Product__header">{`${device.name} ${productBrand.name}`}</h3>
          <div className="Product__wrapper">
              <div className="Product__imgWrap">
                <Image  src={process.env.REACT_APP_API_URL + device.img} alt=""/>
              </div>
              <div className="Product__infoWrap">
                  <div className="Product__shortDescription">
                    {shortDescription.map(i =>
                      <span key={i.id}>{`${i.title} - ${i.description} `.toLowerCase()}</span>)}
                  </div>
                  <div className="Product__buyBlock">
                    <span className="Product__price">{`${new Intl.NumberFormat('ru-RU').format(device.price)} ₽`}</span>
                    {inBasket === true  ? <Button className="productItem__inBasket"  variant="primary">В корзине</Button> :  <Button className="Product__btn" variant="outline-primary" onClick={() => addBasketItemHandler(device.name, device.price, 1,device.img, productBrand.name, device.id)} >Купить</Button> }
                  </div>
              </div>
        </div>
        <div className="Product">
          <h4 className="Product__header">{`Характеристики ${device.name} ${productBrand.name}`}</h4>
          <div className="Product__wrapper">
            <table className='Specific'>
              <tbody>
              {device.info.map(i => {
                return (<tr className="Specific__item" key={i.id}>
                  <td className="Specific__title">
                    <span>{i.title}</span>
                  </td>
                  <td className="Specific__description">{i.description}</td>
                </tr>)
              })}
              </tbody>
              </table>
          </div>
        </div>
      </div>}
    </>
  )
}