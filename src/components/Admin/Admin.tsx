import React, { useContext, useState } from 'react';
import { Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { CreateBrand } from './CreateBrand';
import { CreateProduct } from './CreateProduct';
import { CreateProductType } from './CreateProductType';

const ADMIN = 'ADMIN';

export type AdminModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}



export const Admin = () => {
  const { userRole } = useContext(AuthContext);


  const [showCreateBrand, setShowCreateBrand] = useState(false);
  const [createProductType, setCreateProductType] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);

  if (userRole !== ADMIN) {
    return <Redirect to="/" />
  }

  return (
    <div className="Admin">
      <Button
        className="Admin__button" variant="outline-primary"
        onClick={() => setShowCreateBrand(true)}>
        Добавить бренд
      </Button>
      <Button
        className="Admin__button" variant="outline-primary"
        onClick={() => setCreateProductType(true)}>
        Добавить тип товара
        </Button>
      <Button
        className="Admin__button"
        variant="outline-primary"
        onClick={() => setCreateProduct(true)}>
        Добавить товар
        </Button>
      <CreateBrand show={showCreateBrand} setShow={setShowCreateBrand} />
      <CreateProductType show={createProductType} setShow={setCreateProductType} />
      <CreateProduct show={createProduct} setShow={setCreateProduct}/>
    </div>
  )
}