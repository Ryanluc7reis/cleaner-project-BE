import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createCardSchema = Joi.object({
    name: Joi.string().required().max(25),
    price: Joi.string().required(),
    experience: Joi.string().required().max(256),
    amountCleaning: Joi.number().required(),
    region: Joi.string().required().max(25),
    about: Joi.string().required(),
    cleaning:  Joi.string().required(),
    cleaning2:  Joi.string().required(),
    cleaning3:  Joi.string().required()
  })
  export const editCardSchema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().required().max(25),
    price: Joi.string().required(),
    experience: Joi.string().required().max(256),
    amountCleaning: Joi.number().required(),
    region: Joi.string().required().max(25),
    about: Joi.string().required(),
    cleaning:  Joi.string().required(),
    cleaning2:  Joi.string().required(),
    cleaning3:  Joi.string().required()
  })
  export const editRatingCardSchema = Joi.object({
    id: Joi.objectId().required(),
    rating: Joi.number().required(),
    creator: Joi.string().required()

  })
 
 