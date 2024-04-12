import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createCardSchema = Joi.object({
    name: Joi.string().required().max(25),
    price: Joi.string().required(),
    experience: Joi.string().required().max(256),
    amountCleaning: Joi.number().required(),
    region: Joi.string().required().max(25)
  })
