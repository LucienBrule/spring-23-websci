/*
A health endpoint
*/

import { Router, Request, Response } from 'express';
export const healthRouter: Router = Router();
healthRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

