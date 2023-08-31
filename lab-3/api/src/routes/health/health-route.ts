import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (req, res) => {
  return res.json({
    status: "OK",
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage()
  });
})


export {
  healthRouter
}