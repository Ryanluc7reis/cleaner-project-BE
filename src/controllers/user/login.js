import { Router } from 'express';
import { getIronSession } from 'iron-session';

import { loginUserAndCleaner } from '../../modules/user/user.service';
import { loginSchema } from '../../modules/user/user.schema';
import { celebrate } from 'celebrate';

const login = Router();

login.post('/login', celebrate({ body: loginSchema }), async (req, res) => {
  try {
    const session = await getIronSession(req, res, { 
      password: process.env.SESSION_PASSWORD,
      cookieName: process.env.SESSION_TOKEN_NAME,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
      }
    });
      const user = await loginUserAndCleaner(req.body);
      session.user = {
        id: user._id,
        user: user.user 
      };
      await session.save();
      return res.status(200).send(user);  
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

export default login;
