import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string(),
    email: Joi.string().min(3).max(30).required(),
    pw: Joi.string().min(3).max(30).required(),
    role: Joi.string().valid("admin", "supervisor", "employee", "client").required(),
    is_public: Joi.bool().default(true),
});

export const createTimeTrackingSchema = Joi.object({
    clientId: Joi.string().required(),
    employeeId: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date(),
    status: Joi.string().valid("active", "inactive", "completed").required(),
});

export const createSupplySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().required(),
});

export const createTimeTrackingSchemaSupply = Joi.object({
    timeTrackingId: Joi.string().required(),
    supplyId: Joi.string().required(),
    quantity: Joi.number().required(),
});