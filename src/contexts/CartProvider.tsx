import React, { useState } from 'react';
import { CartContext } from './CartContext';
import { type Cart } from '../data/cart';

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Cart>([]);

  return (
    <CartContext value={{ cart,  setCart}}>
      {children}
    </CartContext>
  );
};