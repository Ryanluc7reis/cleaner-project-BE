import { Router } from 'express';

import { verifyToken } from '../../../utils/auth';

const sessionVerification = Router();

sessionVerification.get('/verify-session', verifyToken, async (req, res) => {
  try { 
    return res.status(200).send(req.user);
  } catch (error) {
    return res.status(401).send({ error: 'Sessão inválida' });
  }
});

export default sessionVerification;
