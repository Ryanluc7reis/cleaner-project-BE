import Joi from 'joi';

 import joiObjectid from 'joi-objectid';
 Joi.objectId = joiObjectid(Joi);

 export const signupUserSchema = Joi.object({
     fullName: Joi.string().required().max(50).message('O campo "nome" pode ter no máximo {{#limit}} caracteres.'),
     user: Joi.string().required().max(30).message('O campo "usuário" pode ter no máximo {{#limit}} caracteres.'),
     email: Joi.string().email({ tlds: { allow: false } }).required().max(100).message('O campo "email" pode ter no máximo {{#limit}} caracteres.'),
     password: Joi.string().required().max(50).message('O campo "senha" pode ter no máximo {{#limit}} caracteres.').min(6).message('O campo "senha" precisa ter no mínimo {{#limit}} caracteres.'),
     address: Joi.string().required().max(50),
     number: Joi.string().pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)??(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).required(),
 });
 export const signupCleanerSchema = Joi.object({
    fullName: Joi.string().required().max(50).message('O campo "nome" pode ter no máximo {{#limit}} caracteres.'),
    user: Joi.string().required().max(30).message('O campo "usuário" pode ter no máximo {{#limit}} caracteres.'),
    email: Joi.string().email({ tlds: { allow: false } }).required().max(100).message('O campo "email" pode ter no máximo {{#limit}} caracteres.'),
    password: Joi.string().required().max(50).message('O campo "senha" pode ter no máximo {{#limit}} caracteres.')
    .min(6).message('O campo "senha" precisa ter no mínimo {{#limit}} caracteres.'),
    address: Joi.string().required().max(50),
    number: Joi.string().pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)??(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).required(),
});
export const editUserSchema = Joi.object({
    id: Joi.objectId().required(),
    fullName: Joi.string().required().max(50),
    user: Joi.string().required().max(30),
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
    password: Joi.string()
      .required()
      .max(50)
      .message('O campo "usuário" pode ter no máximo {{#limit}} caracters.')
      .min(6)
      .message('O campo "senha" precisa ter no minimo {{#limit}} caracters.')
  })
