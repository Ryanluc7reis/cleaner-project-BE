import { Router } from 'express';

import { loginUserAndCleaner } from '../../modules/user/user.service';
import { loginSchema } from '../../modules/user/user.schema';
import { celebrate } from 'celebrate';

const login = Router();

login.post('/login', celebrate({ body: loginSchema }), async (req, res) => {
  try {
      const token = await loginUserAndCleaner(req.body);   
      res.json({auth: true , token})
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

export default login;
