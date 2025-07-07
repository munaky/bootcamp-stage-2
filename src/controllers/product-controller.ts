import { RequestHandler } from "express";
import { productImageSchema, createProductSchema, updateProductSchema } from "../validations/product-validation";
import { prisma } from '../prisma/client';
import { resSuccess, resError } from "../utils/response-format";

export const getAll: RequestHandler = async (req, res) => {
    try {
        res.json(await prisma.product.findMany());
    } catch (error: any) {
        resError(res, 500, error.message ?? 'server error');
    }
}

export const add: RequestHandler = async (req, res) => {
    try {
        const { error } = createProductSchema.validate({ ...req.body, image: req.file });
        if (error) throw error

        const image = req.file?.filename ?? 'default.png';
        const { name, price, stock } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                price: Number(price),
                stock: Number(stock),
                image
            }
        })

        resSuccess(res, 201, 'product created', product);
    } catch (error: any) {
        resError(res, 500, error.message ?? 'server error');
    }
}

export const update: RequestHandler = async (req, res) => {
    try {
        const { error } = updateProductSchema.validate({ ...req.body, image: req.file });
        if (error) throw error

        const image = req.file?.filename ?? 'default.png';
        const { id, name, price, stock } = req.body;

        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                price: Number(price),
                stock: Number(stock),
                image
            }
        })

        resSuccess(res, 200, 'product updated', product);
    } catch (error: any) {
        resError(res, 500, error.message ?? 'server error');
    }
}

export const remove: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = await prisma.product.delete({ where: { id } });

        resSuccess(res, 200, 'product deleted', product);
    } catch (error: any) {
        resError(res, 500, error.message ?? 'server error');
    }
}

export const uploadImage: RequestHandler = async (req, res) => {
    try {
        const { error } = productImageSchema.validate({image: req.file});
        if (error) throw error

        const image = req.file?.filename ?? 'default.png';
        const id = Number(req.body.id);

        const product = await prisma.product.update({
            where: { id },
            data: { image }
        })

        resSuccess(res, 200, 'product image updated', product);
    } catch (error: any) {
        resError(res, 500, error.message ?? 'server error');
    }
}