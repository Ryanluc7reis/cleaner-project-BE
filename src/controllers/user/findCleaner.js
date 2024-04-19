import { Router } from 'express';

import { findCleaner } from '../../modules/user/user.service';

import { verifyToken } from '../../../utils/auth';

const userVerify = Router();

userVerify.get('/verify-cleaner',verifyToken, async (req, res) => {
  try { 
    await findCleaner(req.user)
    return res.status(200).send({ ok: 'cleaner encontrado' });
  } catch (error) {
    return res.status(401).send({ error: 'not found cleaner' });
  }
});

export default userVerify;
