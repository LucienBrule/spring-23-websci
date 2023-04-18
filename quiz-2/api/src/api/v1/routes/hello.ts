import express, {Router} from "express";

export const helloRouter: Router = express.Router();
helloRouter.get('/', (req, res) => {
    res.send('Hello World!');
});
