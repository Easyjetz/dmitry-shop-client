import React, { useEffect, useState } from 'react';
import { AdminModalProps } from './Admin';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';

import { clearProduct, createProduct } from '../../store/actions/adminActions';
import { Message } from '../Message/Message';


interface IInfo {
  title: string;
  description: string;
  id: number;
}



export const CreateProduct: React.FC<AdminModalProps> = ({ show, setShow }) => {

  const { brands } = useTypedSelector(state => state.shop);
  const { productTypes } = useTypedSelector(state => state.productTypes);
  const { productResponse, productError } = useTypedSelector(state => state.admin);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brandId, setBrandId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [img, setImg] = useState<File[]>([]);
  const [info, setInfo] = useState<IInfo[]>([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (productResponse) {
      setMessage(productResponse);
    } else if (productError) {
      setMessage(productError);
    }
  }, [productError, productResponse])

  

  const showProductHandler = () => {
    setShow(show => !show);
    dispatch(clearProduct());
    setName('');
    setPrice('');
    setBrandId('')
    setTypeId('');
    setImg([]);
    setInfo([]);
  }

  const updateInfoItem = (key: string, value: string, id: number) => {
    if (value.length < 40) {
      setInfo(info.map(item => item.id === id ? { ...item, [key]: value } : item));
    }
  }

  const addInfoItemHandler = () => {
    let id: number;
    if (info.length === 0) {
      id = 1;
    } else {
      id = info[info.length - 1].id + 1;
    }
    setInfo(info => [...info, {title: "", description: "", id: id}])
  }

  const deleteInfoItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterInfo = info.filter(item => item.id !== Number(e.currentTarget.id));
    setInfo(filterInfo);
  }

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length < 30) {
      setName(e.currentTarget.value);
    }
  }

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) < 1000000) {
      setPrice(e.currentTarget.value);
    }
  }

  const brandIdHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandId(e.currentTarget.value);
  }

  const typeIdHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeId(e.currentTarget.value);
  }

  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImg([e.currentTarget.files[0]]);
    }
  }


  const createProductHandler = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('brandId', brandId);
    formData.append('typeId', typeId);
    formData.append('info', JSON.stringify(info));
    if (img) {
      for (let file of img) {
        formData.append('img', file);
      }
    }
    dispatch(createProduct(formData))
  }



  return (
    <Modal
      show={show}
      onHide={showProductHandler}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="createProduct"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType="multipart/form-data">
          <Form.Group controlId="formBasicEmail">
            {message && <Message success={productResponse ? true : false} message={message} />}
            <Form.Label>Название товара</Form.Label>
            <Form.Control onChange={nameHandler} value={name} required type="text" />
            <Form.Label>Цена товара</Form.Label>
            <Form.Control onChange={priceHandler} value={price} type="number" />
            <Form.Label>Бренд товара:</Form.Label>
            <div>
              <Form.Control className="Modal__select" value={brandId} custom onChange={brandIdHandler} as="select">
                <option value="Выберите бренд" key="0">Выберите бренд</option>
                {brands && brands.map(brand => <option value={brand.id} key={brand.id}>{brand.name}</option>)}
              </Form.Control>
            </div>

            <Form.Label>Тип товара:</Form.Label>
            <div>
              <Form.Control className="Modal__select" custom value={typeId} onChange={typeIdHandler} as="select">
                <option value="Выберите тип" key="0">Выберите тип</option>
                {productTypes && productTypes.map(productType => <option value={productType.id} key={productType.id}>{productType.name}</option>)}
              </Form.Control>
            </div>
            <Form.File onChange={imgHandler} id="exampleFormControlFile1" label="Загрузить фотографию" />
            <div><Form.Label>Характеристики:</Form.Label></div>
            {info.map(item =>
              <div key={item.id} className="Modal__infoItem">
                <div>
                  <span>Название:</span>
                  <Form.Control value={item.title} onChange={(e) => updateInfoItem('title', e.currentTarget.value, item.id)}   type="text" />
                </div>
                <div>
                  <span>Описание:</span>
                  <Form.Control value={item.description} onChange={(e) => updateInfoItem('description', e.currentTarget.value, item.id)} type="text" />
                </div>
                <Button id={String(item.id)} onClick={deleteInfoItem} variant="outline-danger">Удалить</Button>
              </div>)}
            <Button className="addInfoBtn"  onClick={addInfoItemHandler}>+</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createProductHandler}>Добавить</Button>
        <Button onClick={showProductHandler}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}