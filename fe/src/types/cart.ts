import type { Product } from "./product";

export interface Item extends Product{
    quantity: number;
    [key: string]: any;
}

export interface CartContextType {
  cart: Item[];
  setCart: (cart:Item[]) => void;
  addItem: (cart:Product, quantity?: number) => void;
  updateItem: (item: Item, quantity: number) => void;
  deleteItem: (item: Item) => void;
  deleteAll: () => void;
  loading: boolean;
}