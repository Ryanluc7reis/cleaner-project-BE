import { Router } from 'express';


import { loginUserAndCleaner } from '../../modules/user/user.service';
import { loginSchema } from '../../modules/user/user.schema';
import { celebrate } from 'celebrate';
import dotenv from "dotenv";
dotenv.config(); 

const login = Router();
const AUTH_COOKIE_NAME = process.env.SESSION_TOKEN_NAME

login.post('/login', celebrate({ body: loginSchema }), async (req, res) => {
  try {
      const token = await loginUserAndCleaner(req.body);
      res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
      res.json({auth: AUTH_COOKIE_NAME , token})
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

export default login;
