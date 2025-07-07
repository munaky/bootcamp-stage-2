import { RequestHandler } from "express";
import { prisma } from "../prisma/client";

export const getSuppliers: RequestHandler = async (req, res, next) => {
    try {
        res.json(await prisma.supplier.findMany({ include: { stocks: { include: { product: true } } } }));
    } catch (error) {
        next(error);
    }
}