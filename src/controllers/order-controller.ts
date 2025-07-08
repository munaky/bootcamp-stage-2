import { Request, Response } from "express";
import { products } from "../models/product-model";
import { Item, Order, orders } from "../models/order-model";

export const get = (req: Request, res: Response) => {
    res.json(orders.map(x => {
        x.items = x.items.map(i => {
            return {
                ...i,
                product: products.find(p => p.id == i.id),
            };
        })

        return x;
    }));
}

export const create = (req: Request, res: Response) => {
    const { items } = req.body;
    const id = orders[orders.length - 1].id + 1;

    const order: Order = {
        id: id,
        items: items ?? [],
    }

    orders.push(order);

    res.status(201).send(`new order added. ORDER ID = ${id}`);
}

export const update = (req: Request, res: Response): any => {
    const id = parseInt(req.params.id);
    const { items } = req.body;
    const index = orders.findIndex((x) => x.id == id);

    if (index == -1) return res.send('order not found');

    orders[index].items = items ?? [];

    res.send('order updated');
}

export const remove = (req: Request, res: Response): any => {
    const id = parseInt(req.params.id);
    const index = orders.findIndex((x) => x.id == id);

    if (index == -1) return res.send('order not found');

    orders.splice(index, 1);

    res.send('order deleted');
}