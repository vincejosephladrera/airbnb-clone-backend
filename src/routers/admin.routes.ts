import { Router } from 'express'
import { createNewAdmin, signInAdmin } from '../handlers/admin.controller'

const adminRouter = Router()

adminRouter.post('/', createNewAdmin)
adminRouter.post('/signin', signInAdmin)

export default adminRouter;