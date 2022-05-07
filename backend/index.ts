import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import dotenv from 'dotenv';
import * as bodyparser from 'body-parser';
import cors from 'cors';

import authRouter from './src/routes/auth'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});