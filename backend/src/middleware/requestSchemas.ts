import Joi from "joi";

export const createClientSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string(),
    email: Joi.string().min(3).max(30).required(),
    pw: Joi.string().min(3).max(30).required(),
    is_public: Joi.bool().default(true),
});

export const updateClientSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string(),
    number_of_days: Joi.number().integer().greater(0),
    is_public: Joi.bool(),
}).or("name", "description", "number_of_days", "is_public");