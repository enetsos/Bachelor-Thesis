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
    longStartTime: Joi.number().required(),
    longEndTime: Joi.number(),
    latStartTime: Joi.number().required(),
    latEndTime: Joi.number(),
    notes: Joi.string(),
});

export const createSupplySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

export const createTimeTrackingSchemaSupply = Joi.object({
    supplyId: Joi.string().required(),
});

export const createFeedbackSchema = Joi.object({
    clientId: Joi.string().required(),
    notes: Joi.string().required(),
});