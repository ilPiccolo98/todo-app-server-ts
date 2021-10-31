import express from "express";
import * as controllers from "../controllers/activities";

const router = express.Router();

router.get("/retrieve", controllers.retrieve);

router.post("/add", controllers.addActivity);

router.post("/update", controllers.updateActivity);

router.delete("/delete/:id", controllers.deleteActivity);

export default router;
