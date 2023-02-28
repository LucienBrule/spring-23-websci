import express from 'express';
import health from './health';
import university from "./university";

const router = express.Router();

router.use('/health', health);
router.use('/university', university);

export default router;
