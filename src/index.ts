process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err.stack);
});
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import errorHandler from './middleware/error.middleware';
import { allRequires } from './routes';

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
allRequires(app);
app.use(errorHandler);

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection', err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
