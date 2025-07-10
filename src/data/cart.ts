import type { Product } from "./products";

export interface Item extends Product{
    quantity: number;
}

export type Cart = Item[] | [];