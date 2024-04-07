import { Router } from 'express';

import { signupUser } from '../../modules/user/user.service';
import { signupUserSchema } from '../../modules/user/user.schema';
import { signupCleaner } from '../../modules/user/user.service';
import { signupCleanerSchema } from '../../modules/user/user.schema';
import { celebrate } from 'celebrate';

const signup = Router();

signup.post('/signup', (celebrate({ body: signupUserSchema }), async (req, res) => {
  try {
    const user = await signupUser(req.body)
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
signup.post('/signupAscleaner', (celebrate({ body: signupCleanerSchema }), async (req, res) => {
  try {
    const cleaner = await signupCleaner(req.body)
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
