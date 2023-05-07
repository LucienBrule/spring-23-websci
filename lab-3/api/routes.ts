import express from "express";
const router = express.Router();

router.get("/health", (req, res) => {
    console.log("GET api/v1/health")

    return res.json({
        status: "OK",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage()
    });
})

export {
    router
}