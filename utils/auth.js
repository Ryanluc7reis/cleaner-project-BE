import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { invalidTokens } from '../src/controllers/user/logout'
dotenv.config(); 

const AUTH_SECRET = process.env.SESSION_PASSWORD;
const AUTH_NAME = process.env.SESSION_TOKEN_NAME;


export const generateAccessToken = (data) => {
  const token = sign(data, AUTH_SECRET, { expiresIn: 300});
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers[AUTH_NAME];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  if (invalidTokens.has(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Falha ao autenticar o token' });
    } else {   
      req.user = decoded.user  
      req.userId = decoded.userId
   
      next(); 
    }
  });
};