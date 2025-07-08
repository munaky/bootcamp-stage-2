export interface Item{
    id: number,
    amount: number,
}

export interface Order{
    id: number,
    items: Item[],
}

export let orders: Order[] = [
    {
        id: 1,
        items: [
            {
                id: 1,
                amount: 3
            },
        ]
    },
];

