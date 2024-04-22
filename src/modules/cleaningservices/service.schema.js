import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectId = joiObjectid(Joi);

export const createServiceSchema = Joi.object({
    plan: Joi.string().required().max(25),
    duration: Joi.string().required(),
    startingTime: Joi.string().required().max(256),
    totalCost: Joi.string().required(),
    address: Joi.string().required(),
    number: Joi.string().pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)??(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).required(),
    serviceDate: Joi.string().required(),
    cleaner: Joi.string().required(),
});
