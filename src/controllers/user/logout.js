import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const logout = Router();
const AUTH_NAME = process.env.SESSION_TOKEN_NAME;
export const invalidTokens = new Set();

logout.post('/logout', (req, res) => {
  try {
    const token = req.headers[AUTH_NAME];
    if (!token) return res.status(401).send('Token não fornecido.');

    if (invalidTokens.has(token)) {
      return res.status(401).send('Token já invalidado.');
    }
    
    invalidTokens.add(token);
    res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (err) {
    console.error('Erro durante o logout:', err);
    return res.status(500).send('Ocorreu um erro durante o logout.');
  }
});

export default logout;
