import { Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const accessKey = process.env.SERVER_SECRET_KEY as string;

const ServerKey = (req: Request, res: Response, next: NextFunction) => {
  const key = req.header("ServerAccessKey");

  if (key === accessKey) {
    next();
  } else {
    return res.status(401).json({ message: "Access refused" });
  }
};

export default ServerKey;
