export interface Product {
    id: number,
  name: string,
  price: number,
  image: string,
  added: boolean,
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone",
    price: 2500,
    image: "/image.png",
    added: false,
  },
  {
    id: 2,
    name: "Laptop",
    price: 7500,
    image: "/image.png",
    added: false,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 1200,
    image: "/image.png",
    added: false,
  },
  {
    id: 4,
    name: "Tablet",
    price: 3200,
    image: "/image.png",
    added: false,
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 1800,
    image: "/image.png",
    added: false,
  },
];