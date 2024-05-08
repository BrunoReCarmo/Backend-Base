import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwt_secret_key } from '@utils';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const MidVerifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access refused' });

    try {
        const decoded: any = jwt.verify(token, jwt_secret_key);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export = MidVerifyToken;
