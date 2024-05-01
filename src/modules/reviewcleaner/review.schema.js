import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createReviewSchema = Joi.object({
  forCleaner: Joi.string().required(),
  text: Joi.string().required()
  })
