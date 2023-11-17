import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Récupérez le token du header Authorization
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }

  // Vérifiez le token
  jwt.verify(token, 'your-secret-key', (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }

    // Ajoutez les informations utilisateur décodées à l'objet de demande
    req.user = decoded;
    next();
  });
};
