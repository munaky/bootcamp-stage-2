import { createContext } from 'react';
import { type Cart } from '../data/cart';

export interface CartContextType {
  cart: Cart;
  setCart: (cart:Cart) => void;
}

export const CartContext = createContext<CartContextType | null>(null);
