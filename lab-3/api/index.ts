import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(Number(port),"0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});