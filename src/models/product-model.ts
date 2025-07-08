export interface Product{
    id: number,
    name: string,
    price: number,
    stock: number
}

export let products: Product[] = [
    {
        id: 1,
        name: 'Laptop',
        price: 7000000,
        stock: 10
    },
    {
        id: 2,
        name: 'Monitor',
        price: 2000000,
        stock: 10
    },
    {
        id: 3,
        name: 'Smartphone',
        price: 3000000,
        stock: 10
    },
];