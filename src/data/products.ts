export interface Product {
    id: number,
  name: string,
  description: string,
  price: number,
  image: string,
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.",
    price: 2500,
    image: "/example.png",
  },
  {
    id: 2,
    name: "Laptop",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.",
    price: 7500,
    image: "/example.png",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.",
    price: 1200,
    image: "/example.png",
  },
  {
    id: 4,
    name: "Tablet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.",
    price: 3200,
    image: "/example.png",
  },
  {
    id: 5,
    name: "Smartwatch",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.",
    price: 1800,
    image: "/example.png",
  },
];