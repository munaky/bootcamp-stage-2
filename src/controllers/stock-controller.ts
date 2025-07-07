import { RequestHandler } from "express";
import { prisma } from "../prisma/client";

interface Item {
    productId: number,
    supplierId: number,
    amount: number,
}

export const getStock: RequestHandler = async (req, res, next) => {
    const id = Number(req.params.id);
    res.json(await prisma.stock.findUnique({where:{id}}));
}

export const updateStock: RequestHandler = async (req, res, next) => {
    try {
        const items: Item[] = req.body;
        const batchUpdate: any[] = [];

        if (!items || items.length == 0) throw { message: 'tidak ada product yang dipilih' };

        /* Stock Validation */
        for (const i of items) {
            const supplier = await prisma.supplier.findUnique({ where: { id: i.supplierId } });

            if (!supplier) throw { message: 'suplier tidak ditemukan' };

            const stock = await prisma.stock.findFirst({
                include: {
                    product: true,
                },
                where: {
                    supplierId: i.supplierId,
                    productId: i.productId,
                }
            });

            if (!stock) throw { message: 'terdapat data yang tidak valid' };
            if (stock.stock - i.amount < 0) throw {
                message: `stock ${stock.product.name} dari supplier ${supplier.name} tidak mencukupi`
            }

            batchUpdate.push(prisma.stock.update({
                where: {
                    id: stock.id
                },
                data: {
                    stock: { decrement: i.amount }
                }
            }))
        }

        await prisma.$transaction(batchUpdate);

        res.json({ message: 'berhasil' });
    } catch (error) {
        next(error);
    }
}