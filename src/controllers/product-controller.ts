import { Request, Response } from "express";
import { Product, products } from "../models/product-model";

export const get = (req: Request, res: Response) => {
    res.json(products);
}

export const create = (req: Request, res: Response) => {
    const { name, price, stock } = req.body;

    const product: Product = {
        id: products[products.length - 1].id + 1,
        name: name,
        price: price,
        stock: stock,
    }

    products.push(product);

    res.status(201).send('new product added');
}

export const update = (req: Request, res: Response): any => {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;
    const index = products.findIndex((x) => x.id == id);

    if (index == -1) return res.send('product not found');

    products[index].name = name
    products[index].price = price
    products[index].stock = stock

    res.send('product updated');
}

export const remove = (req: Request, res: Response): any => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((x) => x.id == id);

    if (index == -1) return res.send('product not found');

    products.splice(index, 1);

    res.send('product deleted');
}