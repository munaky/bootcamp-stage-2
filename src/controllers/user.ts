import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const get = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await prisma.user.findUnique({
            include: {
                posts: true
            },
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
        res.json(await prisma.user.findMany({
            include: {
                posts: true
            }
        }));
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createOrUpdate = async (req: Request, res: Response) => {
    try {
        const id = req.params.id ? parseInt(req.params.id) : -1;
        const { name } = req.body;
        const result = await prisma.user.upsert({
            where: {
                id
            },
            update: { name },
            create: { name },
        })

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await prisma.user.delete({
            where: { id }
        })

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}