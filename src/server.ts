import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import adminRouter from './routers/admin.routes'
import listingRouter from './routers/listing.routes';
import userRouter from './routers/user.routes';






const app = express();




app.use(cors())
app.use(morgan('dev'));
app.use(express.json())

//to support query strings in the url
app.use(express.urlencoded({ extended: true }))

app.use('/admin', adminRouter)
app.use('/api/listings', listingRouter)
app.use('/user', userRouter)



export default app;
