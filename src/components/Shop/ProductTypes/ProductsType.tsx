import React, { useEffect } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { fetchProductTypes } from '../../../store/actions/productTypesActions';
import { shopSetTypeId } from '../../../store/actions/shopActions';



export const ProductTypes: React.FC = () => {
  const dispatch = useDispatch();
  const { productTypes, loading } = useTypedSelector(state => state.productTypes);

  function setTypeId(e: React.MouseEvent<HTMLDivElement>) {
    dispatch(shopSetTypeId(Number(e.currentTarget.id)));
  }

  useEffect(() => {
    dispatch(fetchProductTypes());
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  return (
    <ListGroup>
      {productTypes.map(productType =>
        <ListGroup.Item className="listGroupItem" key={productType.id} id={productType.id} onClick={setTypeId}>
          <a className="listGroupItem__link">
            {productType.name}
          </a>
        </ListGroup.Item>)}
    </ListGroup>
  )
}