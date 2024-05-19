import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createRatingSchema = Joi.object({
  forCleaner: Joi.string().required(),
  stars: Joi.number().required()
  })
