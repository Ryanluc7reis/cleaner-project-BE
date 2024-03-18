import { Router } from 'express';
import { loginUser } from '../../modules/user/user.service';
import { loginUserSchema } from '../../modules/user/user.schema';

import { celebrate } from 'celebrate';

const login = Router();

login.post('/login', (celebrate({ body: loginUserSchema }), async (req, res) => {
  try {
    const user = await loginUser(req.body)
    res.status(200).send(user)
  } catch (err) {
      return res.status(400).send(err.message)  
  }
}));

export default login;
