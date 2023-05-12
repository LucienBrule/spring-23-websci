import {Request, Response} from "express";

let logAllRequests = (req: Request, res: Response, next: any) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
}

export {logAllRequests};