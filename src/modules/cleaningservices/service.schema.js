import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectId = joiObjectid(Joi);

export const createServiceSchema = Joi.object({
    plan: Joi.string().required().max(25),
    duration: Joi.string().required(),
    startingTime: Joi.string().required().max(256),
    totalCost: Joi.string().required(),
    serviceDate: Joi.string().required(),
    cleaner: Joi.string().required(),
});
