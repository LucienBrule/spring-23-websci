import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
        name: "Lab 3 API",
        routes: [
            "/",
            "/health"
        ],
        message: "Hello from the API"
    });
})

router.get("/health", (req, res) => {
    return res.json({
        status: "OK",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage()
    });
})

router.get("*", (req, res) => {
    return res.status(404).json({
        message: "Not Found"
    });
})

export {
    router
}