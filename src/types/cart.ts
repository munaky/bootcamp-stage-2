import type { Product } from "./product";

export interface Item extends Product{
    quantity: number;
}

export interface CartContextType {
  cart: Item[];
  setCart: (cart:Item[]) => void;
  addItem: (cart:Product, quantity?: number) => void;
  updateItem: (id: number, quantity: number) => void;
  deleteItem: (id: number) => void;
  deleteAll: () => void;
  loading: boolean;
}