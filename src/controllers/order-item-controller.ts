import { Request, Response } from "express";
import { Item, Order, orders } from "../models/order-model";
import { products } from "../models/product-model";

export const get = (req: Request, res: Response): any => {
    const id = parseInt(req.params.id);
    const index = orders.findIndex(x => x.id == id);

    if (index == -1) return res.send('order not found');

    res.json(orders[index].items.map(i => {
        return {
            ...i,
            product: products.find(p => p.id == i.id),
        };
    }));
}

export const add = (req: Request, res: Response): any => {
    const { items } = req.body;
    const id = parseInt(req.params.id);
    const index = orders.findIndex(x => x.id == id);

    if (index == -1) return res.send('item not found');

    for (const item of items) {
        const item_index = orders[index].items.findIndex(x => x.id == item.id);

        if (item_index != -1) {
            orders[index].items[item_index].amount += item.amount
            continue;
        }

        orders[index].items.push(item);
    }

    res.status(201).send(`new item added to order [${id}]`);
}

export const update = (req: Request, res: Response): any => {
    const { amount } = req.body;
    const id = parseInt(req.params.id);
    const item_id = parseInt(req.params.item_id);
    const index = orders.findIndex(x => x.id == id);
    const item_index = orders[index].items.findIndex(x => x.id == item_id);

    if (item_index == -1) return res.send('item not found');

    orders[index].items[item_index].amount = amount

    res.send('order item updated');
}

export const remove = (req: Request, res: Response): any => {
    const id = parseInt(req.params.id);
    const item_id = parseInt(req.params.item_id);
    const index = orders.findIndex(x => x.id == id);
    const item_index = orders[index].items.findIndex(x => x.id == item_id);

    if (item_index == -1) return res.send('item not found');

    orders[index].items.splice(item_index, 1);

    res.send('item deleted');
}