import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import InvalidToken from '../src/modules/invalidTokens/invalidToken.model';
dotenv.config(); 

const AUTH_SECRET = process.env.SESSION_PASSWORD;
const AUTH_NAME = process.env.SESSION_TOKEN_NAME;

export const generateAccessToken = (data) => {
  const token = sign(data, AUTH_SECRET, { expiresIn: 86400 });
  return token;
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers[AUTH_NAME];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const verifyInvalidToken = await InvalidToken.findOne({ token });
    if (verifyInvalidToken) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    verify(token, AUTH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Falha ao autenticar o token' });
      } else {
        req.user = decoded.user;
        req.userId = decoded.userId;
        req.email = decoded.email;
        req.fullName = decoded.fullName;

        next(); 
      }
    });
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
