import Joi from "joi";

export const profileSchema = Joi.object({
    profile: Joi.any().required(),
});