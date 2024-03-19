import { Router } from 'express';
import { getIronSession } from 'iron-session';

import { signupUser } from '../../modules/user/user.service';
import { signupUserSchema } from '../../modules/user/user.schema';
import { celebrate } from 'celebrate';

const signup = Router();

signup.post('/signup', (celebrate({ body: signupUserSchema }), async (req, res) => {
  try {
    const session = await getIronSession(req, res, { 
      password: process.env.SESSION_PASSWORD,
      cookieName: process.env.SESSION_TOKEN_NAME,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
      }
      });
    const user = await signupUser(req.body)
    session.user = {
      id: user._id,
      user: user.user 
    };
    await session.save();
    res.status(201).send(user)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({
        code: 11000,
        duplicatedKey: Object.keys(err.keyPattern)[0]
      })
    }
    throw err
  }
}));

export default signup;
