import { Request, Response } from "express";
import { prisma } from '../db/client'


interface Book{
    id: number,
    name: string
}

let books: Book[]= [
    {
        id: 1,
        name: 'Book1',
    },
    {
        id: 2,
        name: 'Book2',
    },
    {
        id: 3,
        name: 'Book3',
    },
]


export const get = async (req: Request, res: Response) => {
    res.json(await prisma.book.findMany());
}