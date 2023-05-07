import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {router} from "./routes";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';
const base = process.env.BASE_URL || "/api/v1";

let logAllRequests = (req: Request, res: Response, next: any) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
}

app.use(logAllRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(base, router);
app.listen(Number(port),"0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running on ${port}`);
});