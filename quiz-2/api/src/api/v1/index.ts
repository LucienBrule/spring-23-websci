import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import {Quiz2Router} from "./routes/quiz-2";
const router = express.Router();

// use the json() middleware to parse JSON data
router.use(bodyParser.json());

router.use('/', Quiz2Router);

export { router as AppAPIV1 };
