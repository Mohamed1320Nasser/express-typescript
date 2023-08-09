import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import errorHandler from './middleware/error.middleware';
// import { allRequires } from "./src/utils";
// import { PrismaClient } from "@prisma/client";

dotenv.config({ path: './config/.env' });
const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/api/v1/orders/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});
app.use(errorHandler)
// allRequires(app, prisma);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});