import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import defaultErrHandler from './errHandler'
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import reviewsRouter from './api/reviews';
import favoritesRouter from './api/favorites';
import authenticate from './authenticate';
import swaggerInstall from './utils/swagger';
import './db';

dotenv.config();

const app = express();
const port = process.env.PORT; 

swaggerInstall(app)

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies',  moviesRouter);
app.use('/api/reviews', authenticate, reviewsRouter);
app.use('/api/favorites', authenticate, favoritesRouter);
// app.use('/api/movies', moviesRouter); //ADD THIS BEFORE THE DEFAULT ERROR HANDLER.
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});