import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const get = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id);
        const postId = parseInt(req.params.post_id);
        const result = await prisma.post.findUnique({
            where: {
                id: postId,
                userId
            }
        });

        if (!result) throw { message: 'no data found' };

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id);

        res.json(await prisma.post.findMany({
            where: { userId },
        }));
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createOrUpdate = async (req: Request, res: Response) => {
    try {
        const userId = req.params.user_id ? parseInt(req.params.user_id) : -1;
        const postId = req.params.post_id ? parseInt(req.params.post_id) : -1;
        const { title, content } = req.body;
        const result = await prisma.post.upsert({
            where: {
                id: postId,
                userId
            },
            update: { title, content, userId },
            create: { title, content, userId },
        })

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id);
        const postId = parseInt(req.params.post_id);
        const result = await prisma.post.delete({
            where: {
                id: postId,
                userId
            }
        })

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}