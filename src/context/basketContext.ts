
import { createContext } from 'react';


export interface IBasketItem {
  id: number;
  name: string;
  price: number;
  img: string;
  count: number;
  brand: string;
}

type BasketContextProps = {
  items: IBasketItem[];
  addBasketItem: (item: IBasketItem) => void;
  deleteBasketItem: (item: IBasketItem) => void;
  setProductCount: (id: number, count: number) => void;
}


export const BasketContext = createContext<BasketContextProps>({
  items: [],
  addBasketItem: (item: IBasketItem) => {},
  deleteBasketItem: (item: IBasketItem) => { },
  setProductCount: (id: number, count: number) => { }
})