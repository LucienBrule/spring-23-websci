import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {router} from "./routes";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';

/**
 * The base URL for all API endpoints
 * traffic comes in at /labs/lab-3/api/v1
 * and is rewritten to /api/v1
 *
 * ^ this happens in the ingress configuration
 *
 * specifying the base URL here allows us to
 * change it in one place, rather than in every
 * route file.
 */
const base = process.env.BASE_URL || "/api/v1";

/**
 * Log all requests to the console
 * @param req
 * @param res
 * @param next
 */
let logAllRequests = (req: Request, res: Response, next: any) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
}
app.use(logAllRequests);

/*
 * Add middleware to parse the
 * request body as JSON
 */
app.use(express.json());

/**
 * Add middleware to parse the
 * request body as a URL encoded query string
 */
app.use(express.urlencoded({extended: true}));

/**
 * Add our api router to the express app
 */
app.use(base, router);


/**
 * Start the express server
 */
app.listen(Number(port), "0.0.0.0", () => {

  console.log(`
  ################################################
  🛡️  Server listening on port: ${port} 🛡️
  ################################################
  Information:
  - Base URL: ${base}
  - NODE_ENV: ${process.env.NODE_ENV}
  - PORT: ${process.env.PORT}
  ################################################
  `)
});