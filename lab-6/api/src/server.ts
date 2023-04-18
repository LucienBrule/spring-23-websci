import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppAPIV1 } from './api/v1';
import listEndpoints from 'express-list-endpoints';
dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017";



// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!');
// });
//
// app.get('/health', (req: Request, res: Response) => {
//     res.status(200).send('OK');
// });

// app.use('/api/v1', AppAPIV1);


// const routes = listEndpoints(app);
// console.log();
app.listen(Number(port), "0.0.0.0", () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
