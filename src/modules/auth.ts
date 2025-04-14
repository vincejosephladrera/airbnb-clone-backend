import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
// import { Admin } from '@prisma/client'

import bcrypt from 'bcrypt';

export function comparePasswords(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 5)
}

type Admin = {
  email: string,
  id: string
}

type User = {
  email: string,
  id: string
}


export const createJWT = ({ email, id }: Admin | User) => {

  const token = jwt.sign(
    { email, id },
    process.env.JWT_SECRET!
  );

  return token;
};

export const protect = (req: Request & { user?: unknown }, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send("Not Authorized")
  }

  const [, token] = bearer!.split(" ");
  if (!token) {
    res.status(401).send("Not Authorized")
  }


  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload
    console.log(payload);
    next();

  } catch (e) {
    console.error(e);
    res.status(401).send("Not Authorized")
  }
};