import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { clearBrand, createBrand } from '../../store/actions/adminActions';
import { fetchBrands } from '../../store/actions/shopActions';
import { Message } from '../Message/Message';
import { AdminModalProps } from './Admin';


export const CreateBrand: React.FC<AdminModalProps> = ({ show, setShow }) => {
  
  const [brandName, setBrandName] = useState('');
  const {brandResponse, brandError } = useTypedSelector(state => state.admin);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (brandResponse) {
      setMessage(brandResponse);
    } else if (brandError) {
      setMessage(brandError);
    }

  }, [brandResponse, brandError])

  const showBrandHandler = () => {
    setShow(show => !show);
    dispatch(clearBrand());
    setBrandName('');
  }



  const brandNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length < 25) {
      setBrandName(e.currentTarget.value);
    }
  }

  const createBrandHandler = () => {
    dispatch(createBrand(brandName));
    dispatch(clearBrand());
  }

  useEffect(() => {
    dispatch(fetchBrands());
  }, [createBrandHandler]);


  return (
    <Modal
      show={show}
      onHide={showBrandHandler}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            {message && <Message success={brandResponse ? true : false} message={message} />}
            <Form.Label>Название бренда</Form.Label>
            <Form.Control onChange={brandNameHandler} type="text" value={brandName} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createBrandHandler}>Добавить</Button>
        <Button onClick={showBrandHandler}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}