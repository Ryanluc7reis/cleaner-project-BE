import { Router } from 'express';

import { findCleaner } from '../../modules/user/user.service';

import { verifyToken } from '../../../utils/auth';

const userVerify = Router();

userVerify.get('/verify-cleaner', verifyToken, async (req, res) => {
  try { 
    const cleaner = await findCleaner(req.user, req.fullName)
    if (cleaner) return res.status(200).send({ ok: 'cleaner encontrado' })

        return res.status(400).send({ error: 'not found cleaner' })
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default userVerify;
