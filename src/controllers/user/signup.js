import { Router } from 'express';
import { signupUser } from '../../modules/user/user.service';
import { signupUserSchema } from '../../modules/user/user.schema';
import { signupCleaner } from '../../modules/user/user.service';
import { signupCleanerSchema } from '../../modules/user/user.schema';
import { celebrate,  Segments } from 'celebrate';

const signup = Router();

signup.post('/signup', celebrate({ [Segments.BODY]: signupUserSchema }), async (req, res) => {
  try {
    const user = await signupUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({
        code: 11000,
        duplicatedKey: Object.keys(err.keyPattern)[0]
      });
    }
    
    next(err)
  }
});

signup.post('/signupAscleaner', celebrate({ [Segments.BODY]: signupCleanerSchema }), async (req, res) => {
  try {
    const cleaner = await signupCleaner(req.body);
    res.status(201).send(cleaner);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({
        code: 11000,
        duplicatedKey: Object.keys(err.keyPattern)[0]
      });
     
    }
    
    next(err)
  }
});
signup.use((err, req, res, next) => {
  if (err.joi) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.joi.details.map(detail => detail.message)
    });
  }
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});
export default signup;
