import express, {Express} from "express";
import {spotifyRouter} from "@/routes/spotify/";
import {chatRouter} from "@/routes/chat";
import listEndpoints from "express-list-endpoints";
import {healthRouter} from "@/routes/health/health-route";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/chat", chatRouter);
router.use("/spotify", spotifyRouter);

router.get("/", (req, res) => {
    return res.json({
        name: "Lab 3 API",
        routes: listEndpoints(router as Express).map((route) => {
            return route.path;
        })
    })
})

router.get("*", (req, res) => {
    return res.status(404).json({
        message: "Not Found"
    });
})

export {
    router
}