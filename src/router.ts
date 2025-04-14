import { Router } from 'express'

const router = Router()

router.get('/listings', (req, res) => {
  res.json({
    message: JSON.parse(req.body)
  })

})

router.get('/listings/:id', () => {

})

router.post('/listings', () => {

})

router.put('/listings/:id', () => {

})

router.delete('/listings/:id', () => {

})

export default router;