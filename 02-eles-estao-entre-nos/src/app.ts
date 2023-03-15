import express from "express";
import * as oddController from "./controllers/oddController.js";
import oddValidationMiddleware from "./middlewares/oddValidationMiddleware.js";

const app = express();
app.use(express.json());

app.post("/secret/odd", oddValidationMiddleware, oddController.isOdd);

export default app;
