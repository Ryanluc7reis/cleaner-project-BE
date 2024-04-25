import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createHistoricSchema = Joi.object({
    for: Joi.string().required(),
    historicType: Joi.string().required(),
   
  })

