import React, { useState } from 'react';
import { CartContext } from './CartContext';
import { type Item } from '../types/cart';
import type { Product } from '../types/product';

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addItem = (item: Product, quantity: number = 1) => {
    setLoading(true);
    const itemIndex = cart.findIndex(i => i.id === item.id);

    if (itemIndex !== -1) {
      const updatedCart = cart.map((i, index) =>
        index === itemIndex
          ? { ...i, quantity: i.quantity + quantity}
          : i
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }

    setTimeout(() => setLoading(false), 500);
  };

  const updateItem = (id: number, quantity: number) => {
    setLoading(true);
    setCart(prev => prev.map(item => {
      if(item.id == id) item.quantity = quantity;
      return item;
    }));
    setTimeout(() => setLoading(false), 500);
  }

  const deleteItem = (id: number) => {
    setLoading(true);
    setCart(prev => prev.filter(item => item.id != id));
    setTimeout(() => setLoading(false), 500);
  }

  const deleteAll = () => {
    setLoading(true);
    setCart([]);
    setTimeout(() => setLoading(false), 1000);
  }


  return (
    <CartContext value={{ cart, setCart, updateItem, addItem, deleteItem, deleteAll, loading }}>
      {children}
    </CartContext>
  );
};