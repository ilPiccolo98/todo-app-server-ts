import express from "express";
import activitiesRouter from "./routes/activities";

const app = express();
app.use(express.json());
app.use("/activities", activitiesRouter);

app.listen(3000);
