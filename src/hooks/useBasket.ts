import { IBasketItem } from '../context/basketContext';
import { useEffect, useState } from 'react'

export const useBasket = () => {

  const [items, setItems] = useState<IBasketItem[] | []>([]);

  const addBasketItem = (item: IBasketItem) => {
    setItems(items => {
      localStorage.setItem('Basket', JSON.stringify([...items, item]));
      return [...items, item]
    });
  }

  const deleteBasketItem = (item: IBasketItem) => {
    const newBasket = items.filter(i => i.id !== item.id);
    setItems(newBasket);
    localStorage.setItem('Basket', JSON.stringify(newBasket));
  }

  const setProductCount = (id: number, count: number) => {
    const copyItems = items.concat();
    const basket = copyItems.map((i: IBasketItem) => {
      if (i.id === id) {
        if (count > 100) {
          count = 100;
        } else if (count < 1) {
          count = 0;
        } 
        return { ...i, "count": count };
    
      } return i;
    });
    setItems(basket);
    localStorage.setItem('Basket', JSON.stringify(basket));
  }


  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('Basket') || '[]');
    if (basket) {
      setItems(basket);
    }
  }, []);


  return {items, addBasketItem, deleteBasketItem, setProductCount}
}