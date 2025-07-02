import { RequestHandler } from "express";
import { productSchema } from "../validations/product-validation";
import { prisma } from '../prisma/client';

export const getAll: RequestHandler = async (req, res) => {
    try {
        res.json(await prisma.product.findMany());
    } catch (error) {
        res.status(500).json(error);
    }
}

export const add: RequestHandler = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) throw error

        const { name, price, stock } = req.body;

        const product = await prisma.product.create({
            data: { name, price, stock }
        })

        res.status(201).json({ message: 'product created', product });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const update: RequestHandler = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) throw error

        const id = Number(req.params.id);
        const { name, price, stock } = req.body;

        const product = await prisma.product.update({
            where: { id },
            data: { name, price, stock }
        })

        res.json({ message: 'product updated', product });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const remove: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = await prisma.product.delete({ where: { id } });

        res.json({ message: 'product deleted', product });
    } catch (error) {
        res.status(500).json(error);
    }
}