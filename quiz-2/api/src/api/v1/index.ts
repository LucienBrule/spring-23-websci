import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// use the json() middleware to parse JSON data
router.use(bodyParser.json());

// get all the files in the routes directory
const routeFiles = fs.readdirSync(path.join(__dirname, 'routes'));

// dynamically import each route file and use its router
// routeFiles.forEach((file) => {
//     if (file.endsWith('.ts')) {
//         const routePath = path.join(__dirname, 'routes', file);
//         import(routePath).then((routeModule) => {
//             const { router: routeRouter } = routeModule;
//             router.use(`/${file.replace('.ts', '')}`, routeRouter);
//         });
//     }
// });

export { router as AppAPIV1 };
