import { Router } from "express";
import { signupUser } from "../services/user";

import validation from "../middlewares/validation";
import Joi from 'joi'

const userSchema = Joi.object({
    fullName : Joi.string().required().max(50),
    user : Joi.string().required().max(30),
    email: Joi.string().email().required().max(100),
    password : Joi.string().required().max(50).min(6),
    adress: Joi.string().required().max(50),
    number: Joi.number().required().max(50)
  })

const router = Router();

router.post('/',(validation({ body: userSchema }), (req, res) => {
    try {
         signupUser(req.body);
        res.status(200).send("ok");
    } catch (err) {
        console.log(err.message); 
        res.status(400).send('paia dogs 123');
    }
}));

export default router;
