import Joi from 'joi';

export const createProductSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(0).required(),
    image: Joi.any().required(),
});

export const updateProductSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(0).required(),
    image: Joi.any().required(),
});

export const productImageSchema = Joi.object({
    image: Joi.any().required(),
});