import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createHistoricSchema = Joi.object({
    for: Joi.string().required(),
    historicType: Joi.string().required(),
   
  })
  export const cleanHistoricSchema = Joi.object({
    ids: Joi.array().items(Joi.objectId()).min(1).required()
  });