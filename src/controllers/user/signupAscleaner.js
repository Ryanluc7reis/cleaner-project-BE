import { Router } from 'express';
import { getIronSession } from 'iron-session';

import { signupCleaner } from '../../modules/user/user.service';
import { signupCleanerSchema } from '../../modules/user/user.schema';
import { celebrate } from 'celebrate';

const signup = Router();

signup.post('/signupAscleaner', (celebrate({ body: signupCleanerSchema }), async (req, res) => {
  try {
    const session = await getIronSession(req, res, { 
      password: process.env.SESSION_PASSWORD,
      cookieName: process.env.SESSION_TOKEN_NAME,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
      }
      });
    const cleaner = await signupCleaner(req.body)
    session.user = {
      id: cleaner._id,
      user: cleaner.user 
    };
    await session.save();
    res.status(201).send(cleaner)
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
