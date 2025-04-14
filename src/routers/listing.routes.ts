import { Router } from 'express'
import { validateData } from '../modules/validations'
import { createListingSchema } from '../models/listing.model'
import { protect, requireRole } from '../modules/auth'



const listingRouter = Router()

listingRouter.get('/', (req, res) => {
  res.send("This is the listings.")
})

// listingRouter.get('/listings/:id', () => {
// })

listingRouter.post('/', validateData(createListingSchema), protect, requireRole('user'), (req, res) => {
  res.send("Listing created")
})

// listingRouter.put('/listings/:id', () => {
// })

// listingRouter.delete('/listings/:id', () => {
// })

export default listingRouter;