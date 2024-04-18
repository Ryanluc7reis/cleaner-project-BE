import { Router } from 'express';

import { loginUserAndCleaner } from '../../modules/user/user.service';
import { loginSchema } from '../../modules/user/user.schema';
import { celebrate, Segments } from 'celebrate';

const login = Router();

login.post('/login', celebrate({ [Segments.BODY]: loginSchema }), async (req, res) => {
  try {
      const token = await loginUserAndCleaner(req.body);   
      res.json({auth: true, token})
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
login.use((err, req, res, next) => {
  if (err.joi) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.joi.details.map(detail => detail.message)
    });
  }
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});

export default login;
