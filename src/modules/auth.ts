import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
// import { Admin } from '@prisma/client'

type Admin = {
  username: string,
  password: string,
}


export const createJWT = ({ username, password }: Admin) => {

  const token = jwt.sign(
    { username, password },
    process.env.JWT_SECRET!
  );

  return token;
};

export const protect = (req: Request & { user?: unknown }, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({
      error: {
        message: "Not Authorized"
      }
    })
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({
      error: {
        message: "Not Authorized"
      }
    })
    return;
  }



  try {
    const payload = jwt.verify(token, process.env.JWT_secret!);
    req.user = payload
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({
      error: {
        message: "Not Authorized"
      }
    })
    return;
  }
};