import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { clearProductType, createProductType } from '../../store/actions/adminActions';
import { fetchProductTypes } from '../../store/actions/productTypesActions';
import { Message } from '../Message/Message';
import { AdminModalProps } from './Admin';


export const CreateProductType: React.FC<AdminModalProps> = ({ show, setShow }) => {
  
  const dispatch = useDispatch();
  const [productTName, setProductTName] = useState('');
  const { productTypeResponse, productTypeError } = useTypedSelector(state => state.admin);
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (productTypeResponse) {
      setMessage(productTypeResponse);
    } else if (productTypeError) {
      setMessage(productTypeError);
    }

  }, [productTypeResponse, productTypeError])

  const showProductTypeHandler = () => {
    setShow(show => !show);
    dispatch(clearProductType());
    setProductTName('');
  }


  const createProductTypeHandler = () => {
    dispatch(createProductType(productTName));
    dispatch(clearProductType());
  }

  const productTNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length < 40) {
      setProductTName(e.currentTarget.value);
    }
  }

  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [createProductTypeHandler])




  return (
    <Modal
      show={show}
      onHide={showProductTypeHandler}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип товара
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            {message && <Message success={productTypeResponse ? true : false} message={message} />}
            <Form.Label>Название типа товара</Form.Label>
            <Form.Control value={productTName} onChange={productTNameHandler} type="text" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createProductTypeHandler}>Добавить</Button>
        <Button onClick={showProductTypeHandler}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}