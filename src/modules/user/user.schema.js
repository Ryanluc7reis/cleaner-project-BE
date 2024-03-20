import Joi from 'joi';

 import joiObjectid from 'joi-objectid';
 Joi.objectId = joiObjectid(Joi);

 export const signupUserSchema = Joi.object({
     fullName: Joi.string().required().max(50).message('O campo "nome" pode ter no máximo {{#limit}} caracteres.'),
     user: Joi.string().required().max(30).message('O campo "usuário" pode ter no máximo {{#limit}} caracteres.'),
     email: Joi.string().email({ tlds: { allow: false } }).required().max(100).message('O campo "email" pode ter no máximo {{#limit}} caracteres.'),
     password: Joi.string().required().max(50).message('O campo "senha" pode ter no máximo {{#limit}} caracteres.').min(6).message('O campo "senha" precisa ter no mínimo {{#limit}} caracteres.'),
     address: Joi.string().required().max(50),
     number: Joi.number().required().min(1)
 });
 export const signupCleanerSchema = Joi.object({
    fullName: Joi.string().required().max(50).message('O campo "nome" pode ter no máximo {{#limit}} caracteres.'),
    user: Joi.string().required().max(30).message('O campo "usuário" pode ter no máximo {{#limit}} caracteres.'),
    email: Joi.string().email({ tlds: { allow: false } }).required().max(100).message('O campo "email" pode ter no máximo {{#limit}} caracteres.'),
    password: Joi.string().required().max(50).message('O campo "senha" pode ter no máximo {{#limit}} caracteres.')
    .min(6).message('O campo "senha" precisa ter no mínimo {{#limit}} caracteres.'),
    number: Joi.number().required().min(1)
});
 export const loginUserSchema = Joi.object({
    userOrEmail: Joi.string().required(),
    password: Joi.string()
      .required()
      .max(50)
      .message('O campo "usuário" pode ter no máximo {{#limit}} caracters.')
      .min(6)
      .message('O campo "senha" precisa ter no minimo {{#limit}} caracters.')
  })
