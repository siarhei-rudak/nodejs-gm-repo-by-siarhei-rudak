import express from 'express';
import apiRouter from './routers/apiRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);

app.listen(process.env.PORT, () => console.log('App is runing'));
