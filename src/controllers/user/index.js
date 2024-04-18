import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { editUser,getUser , verifyPassword} from '../../modules/user/user.service';
import { editUserSchema, verifyPasswordSchema } from '../../modules/user/user.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.patch('/editUser',verifyToken, celebrate({ [Segments.BODY]: editUserSchema }), async (req, res) => {
  try {
    
    const refreshUser = await editUser(req.body, req.user)
    if (refreshUser) return res.status(200).send(refreshUser)

    return res.status(400).send('user not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.post('/verify-password', verifyToken, celebrate({ [Segments.BODY]: verifyPasswordSchema }), async (req, res) => {
  try {    
   
   const user = await  verifyPassword(req.body, req.user)
      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err.message)
    }
});


router.get('/findUser', verifyToken, async (req, res) => {
  try {    
   
   const user = await  getUser(req.userId)
      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err.message)
    }
});



router.use((err, req, res, next) => {
  if (err.joi) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.joi.details.map(detail => detail.message)
    });
  }
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});

export default router;
