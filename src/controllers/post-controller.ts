import { Request, Response } from "express";
import { prisma } from '../prisma/client'

export const get = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.query;

        const data: object = await prisma.post.findMany({
            include: {
                category: true,
                comments: true,
            },
            ...(categoryId ? {
                where: {
                    categoryId: parseInt(categoryId as string),
                }
            } : {}),
        });

        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { take, skip } = req.query;

        const data = await prisma.comment.findMany({
            where: {
                postId: parseInt(postId),
            },
            take: take ? parseInt(take as string) : 25,
            skip: skip ? parseInt(skip as string) : 0,
        })

        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getCommentsSummary = async (req: Request, res: Response) => {
    try {
        const { postId, minComment, maxComment, take, skip } = req.query;

        const data = await prisma.comment.groupBy({
            by: ['postId'],
            ...(postId ? { where: { postId: parseInt(postId as string) } } : {}),
            _count: true,
            orderBy: {
                postId: 'asc'
            },
            take: take ? parseInt(take as string) : 25,
            skip: skip ? parseInt(skip as string) : 0,
            having: {
                postId: {
                    _count: {
                        ...(minComment ? { gte: parseInt(minComment as string) } : { gte: 0 }),
                        ...(maxComment ? { lte: parseInt(maxComment as string) } : {}),
                    }
                }
            }
        })

        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}