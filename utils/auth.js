import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

const AUTH_SECRET = process.env.SESSION_PASSWORD;
const AUTH_NAME = process.env.SESSION_TOKEN_NAME;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION ; 

export const generateAccessToken = (data, res) => {
  const token = sign(data, AUTH_SECRET, { expiresIn: TOKEN_EXPIRATION });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers[AUTH_NAME];
  if (!token) return res.status(401).send('Token não fornecido.');

  verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Falha na autenticação do token.');
    req.user = decoded.user;


    const now = Math.floor(Date.now() / 1000);
    const { exp } = decoded;
    if (exp - now < 1800) {  
      const newToken = generateAccessToken(decoded.user);
      
      res.set(AUTH_NAME, newToken);
    }
    next();
  });
};
