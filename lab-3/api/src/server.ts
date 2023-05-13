import express, {Express, Request, Response} from 'express';
import config from "./config";
import {router as APIV1Router} from "./routes";
import listEndpoints from "express-list-endpoints";
import {logAllRequests} from "@/middleware/request-logger";
import {errorHandler} from "@/middleware/error-handler";

const app: Express = express();

/**
 * Log all requests to the console
 */

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
app.use(config.baseUri, APIV1Router);

/**
 * Index route to return the API
 * name, version, and available routes
 */
app.get("/", (req: Request, res: Response) => {

  return res.json({
    name: "Lab 3 API",
    routes: listEndpoints(app).map((route) => {
      return route.path;
    }),
    config:{
      environment: config.environment,
      port: config.port,
      host: config.host,
      baseUri: config.baseUri
    }
  })
})



/**
 * Add a catch-all route to return a 404
 * for any route that doesn't exist
 */
app.all("*", (req: Request, res: Response) => {
  return res.status(404).json({
    name: "Lab 3 API",
    message: "Not Found",
    request: {
      method: req.method,
      url: req.url,
      body: req.body
    }
  });
})

/**
 * Add our error handler middleware
 */

app.use(errorHandler);

/**
 * Start the express server
 */
app.listen(Number(config.port), config.host, () => {

  console.log(`
  ################################################
  🛡️  Server listening on port: ${config.port} 🛡️
  ################################################
  Information:
  - Environment:  ${config.environment}
  - Host:         ${config.host}
  - Base URL:     ${config.baseUri}
  - PORT:         ${process.env.PORT}
  Link: http://${config.host}:${config.port}${config.baseUri}
  ################################################
  `)
});