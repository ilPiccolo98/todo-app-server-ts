import express from "express";
import * as controllers from "../controllers/activities";

const router = express.Router();

router.post("/add", controllers.addActivity);

router.post("/update", controllers.deleteActivity);

router.delete("/delete", controllers.updateActivity);

export default router;
