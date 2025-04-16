import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { Request, Response } from "express";



export async function createNewUser(req: Request, res: Response) {
  const hash = await hashPassword(req.body.password)

  const existingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })

  if (existingUser) {
    res.status(400).json({ error: { message: "Email is already used." } })
    return
  }

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: hash
    }
  })

  const token = createJWT(user)
  res.status(200).json({ user, token })
  return
}

export async function signInUser(req: Request, res: Response) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })

  if (!existingUser) {
    res.status(400).json({ error: { message: "Invalid username or password." } })
    return
  }

  const isValid = await comparePasswords(req.body.password, existingUser!.password)

  if (!isValid) {
    res.status(400).json({ error: { message: "Invalid username or password." } })
    return
  }

  const token = createJWT(existingUser!)

  res.status(200).json({ user: existingUser, token })
  return
}