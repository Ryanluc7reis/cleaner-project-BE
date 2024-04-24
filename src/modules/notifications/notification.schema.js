import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createNotificationSchema = Joi.object({
    for: Joi.string().required(),
    notificationType: Joi.string().required(),
   
  })