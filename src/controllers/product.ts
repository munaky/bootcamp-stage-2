import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getProducts = async (req: Request, res: Response) => {
  const {
    sortBy = "price",
    order = "asc",
    minPrice,
    maxPrice,
    limit = 10,
    offset = 0,
  } = req.query;

  const filters: any = {};
  if (minPrice) filters.price = { gte: parseInt(minPrice as string) };
  if (maxPrice)
    filters.price = {
      ...(filters.price || {}),
      lte: parseInt(maxPrice as string),
    };

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
    });

    const total = await prisma.product.count({ where: filters });

    res.json({ data: products, total });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
