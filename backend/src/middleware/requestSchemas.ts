import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string(),
    email: Joi.string().min(3).max(30).required(),
    pw: Joi.string().min(3).max(30).required(),
    role: Joi.string().valid("admin", "supervisor", "employee", "client").required(),
    is_public: Joi.bool().default(true),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(30),
    role: Joi.string().valid("admin", "supervisor", "employee", "client")
}).or("name", "description", "number_of_days", "is_public");