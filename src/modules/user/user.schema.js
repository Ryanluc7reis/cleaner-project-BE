import Joi from 'joi';

 import joiObjectid from 'joi-objectid';
 Joi.objectId = joiObjectid(Joi);

 export const signupUserSchema = Joi.object({
     fullName: Joi.string().required(),
     user: Joi.string().required(),
     email: Joi.string().email({ tlds: { allow: false } }).required(),
     password: Joi.string().required(),
     address: Joi.string().required(),
     number: Joi.string().pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)??(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).required(),
 });
 export const signupCleanerSchema = Joi.object({
    fullName: Joi.string().required(),
    user: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    number: Joi.string().pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)??(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).required(),
});
export const editUserSchema = Joi.object({
    id: Joi.objectId().required(),
    fullName: Joi.string().required(),
    user: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required().max(100),
    password: Joi.string().required(),
    address:Joi.string().required(),
    number: Joi.string().pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)??(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).required(),
  })
  export const verifyPasswordSchema = Joi.object({
    password: Joi.string().required(),
  })
 export const loginSchema = Joi.object({
    userOrEmail: Joi.string().required(),
    password: Joi.string().required()
  })
