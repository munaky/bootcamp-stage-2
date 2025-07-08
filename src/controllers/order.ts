import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getAll = async (req: Request, res: Response) => {
	const {
		limit,
		offset,
		minQuantity,
		maxQuantity
	} = req.query;

	const filters: any = {};
	if (minQuantity) filters._sum = { gte: parseInt(minQuantity as string) };
	if (maxQuantity)
		filters._sum = {
			...(filters._sum || {}),
			lte: parseInt(maxQuantity as string),
		};

	try {
		const orders = await prisma.order.groupBy({
			by: ['userId'],
			_sum: { quantity: true },
			having: {
				quantity: filters,
			},
			orderBy: { userId: "asc" },
			take: limit ? parseInt(limit as string) : 25,
			skip: offset ? parseInt(offset as string) : 0,
		});

		const total = (await prisma.order.groupBy({ by: 'userId' })).length;

		res.json({
			data: orders,
			total,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};
