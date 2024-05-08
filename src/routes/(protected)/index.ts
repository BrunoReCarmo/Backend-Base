import { Router, Request, Response } from "express";
import { MidVerifyToken } from "@middleware";

const ProtectedRoutes = Router();

ProtectedRoutes.get('/test', MidVerifyToken, (req: Request, res: Response) => {
    return res.send("Hello Word, Middleware is working")
});

export = ProtectedRoutes;