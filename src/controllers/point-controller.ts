import { RequestHandler } from "express";
import { prisma } from "../prisma/client";

export const get: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const user = await prisma.user.findUnique({
            where: { id },
            select: { points: true }
        });

        if (!user) throw { message: 'user tidak ditemukan' };

        res.json(user);
    } catch (error) {
        next(error)
    }
}

export const transfer: RequestHandler = async (req, res, next) => {
    try {
        const { senderId, receiverId, amount } = req.body;

        if (amount <= 0) throw { message: 'jumlah transter harus lebih dari 0' }

        const [sender, receiver] = [
            await prisma.user.findUnique({ where: { id: senderId } }),
            await prisma.user.findUnique({ where: { id: receiverId } }),
        ];

        if(!sender || !receiver) throw {message: 'pengirim atau penerima tidak valid'};
        if(sender.points - amount < 0) throw {message: 'points tidak mencukupi'};

        const result = await prisma.$transaction( async (tx) => {
            await tx.user.update({
                where: {id: senderId},
                data: {points: {decrement: amount}}
            });

            await tx.user.update({
                where: {id: receiverId},
                data: {points: {increment: amount}}
            });
        });

        res.json({message: 'transfer berhasil'})
    } catch (error) {
        next(error);
    }
}