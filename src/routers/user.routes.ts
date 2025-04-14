import { Router } from 'express'
import { createNewUser, signInUser } from '../handlers/user.controller';

const userRouter = Router();

userRouter.post('/', createNewUser)
userRouter.post('/signin', signInUser)

export default userRouter