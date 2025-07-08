import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const get = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await prisma.product.findUnique({
            where: { id }
        });

        if (!result) throw { message: 'no data found' };

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        res.json(await prisma.product.findMany());
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createOrUpdate = async (req: Request, res: Response) => {
    try {
        const id = req.params.id ? parseInt(req.params.id) : -1;
        const { name, price } = req.body;
        const product = await prisma.product.upsert({
            where: {
                id
            },
            update: { name, price },
            create: { name, price },
        })

        res.json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

/* export const update = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).json({
            message: 'unable to update data'
        });
    }
}
 */

export const remove = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await prisma.product.delete({
            where: { id }
        })

        res.json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}