import express from 'express'
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';




const app = express();




app.use(cors())
app.use(morgan('dev'));
app.use(express.json())

//to support query strings in the url
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.body = JSON.stringify('middleware')
  next();
})

app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/api', protect, router);

export default app;
