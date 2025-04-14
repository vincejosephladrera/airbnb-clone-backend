import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import adminRouter from './routers/admin.routes'
import listingRouter from './routers/listing.routes';




const app = express();




app.use(cors())
app.use(morgan('dev'));
app.use(express.json())

//to support query strings in the url
app.use(express.urlencoded({ extended: true }))

app.use('/admin', adminRouter)
app.use('/api', protect, listingRouter);



export default app;
