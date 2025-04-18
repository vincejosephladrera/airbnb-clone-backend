import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";
import { Response } from "express";


type Admin = {
  email: string,
  password: string,
}

export async function createNewAdmin(req: { body: Admin }, res: Response) {

  const hash = await hashPassword(req.body.password);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: req.body.email },
  });

  if (existingAdmin) {
    res.status(401).send("Email was already taken.")
    return
  }

  const admin = await prisma.admin.create({
    data: {
      email: req.body.email,
      password: hash,
    },
  });

  const token = createJWT({ role: "admin", ...admin });
  res.status(200).json({ admin, token });
  return
}

export async function signInAdmin(req: { body: Admin }, res: Response) {
  const admin = await prisma.admin.findUnique({
    where: { email: req.body.email },
  });

  if (admin) {
    const isValid = await comparePasswords(req.body.password, admin.password);
    if (!isValid) {

      res.status(401).send("Invalid username or password");
      return
    }
    const token = createJWT({ role: "admin", ...admin });
    res.status(200).json({ admin, token });
    return
  }


  res.status(401).send("Invalid username or password");
  return
}



