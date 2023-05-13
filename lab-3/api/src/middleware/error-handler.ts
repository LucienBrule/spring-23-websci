import {NextFunction, Request, Response} from "express";

let errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  console.log(err.stack);

  return res.status(500).json({
    name: "Lab 3 API",
    message: "Internal Server Error",
    error: err.message,
    request: {
      method: req.method,
      url: req.url,
      body: req.body
    }
  })

}

export {errorHandler};