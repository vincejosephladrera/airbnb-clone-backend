import { Router } from 'express'

const listingRouter = Router()

listingRouter.get('/listings', (req, res) => {
  res.send("This is the listings.")
})

// listingRouter.get('/listings/:id', () => {
// })

// listingRouter.post('/listings', () => {
// })

// listingRouter.put('/listings/:id', () => {
// })

// listingRouter.delete('/listings/:id', () => {
// })

export default listingRouter;