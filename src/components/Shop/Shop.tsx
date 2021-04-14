import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchBrands, fetchDevices, setPage } from '../../store/actions/shopActions';
import { Products } from './Products/Products';
import { ProductTypes } from './ProductTypes/ProductsType';

export const Shop: React.FC = () => {

  const dispatch = useDispatch();
  const { typeId, devices, limit, page } = useTypedSelector(state => state.shop); 

  useEffect(() => {
    dispatch(fetchBrands());
  }, [])

  useEffect(() => {
    if (typeId) {
      dispatch(fetchDevices(page, limit, typeId));
    } else {
      dispatch(fetchDevices(page, limit));
    }
  }, [typeId, page]);

  const createPagination = (active: number) => {
    let items = [];
    let max = 1;

    if (devices && devices.count) {
      max = Math.ceil(devices && devices?.count / 9);
    }

    for (let number = 1; number <= max; number++) {
      items.push(
        <Pagination.Item key={number} onClick={() => dispatch(setPage(number))} active={number ===   active}>
        {number}
        </Pagination.Item>,
      );
    }
    return items;
  }

  const pagination = createPagination(page);

  return (
    <div className="Shop">
      <Row style={{ marginTop: '30px' }}>
        <Col className="Shop__menu" lg={3} style={{padding: '0px'}}>
          <ProductTypes />
        </Col>
        <Col lg={9} className="ProductsWrapper">
          {devices && <Products products={devices.rows} />}
          <div>
            <Pagination size="lg" className="Pagination">{pagination}</Pagination>
          </div>
        </Col>
      </Row>
    </div>
  )
}