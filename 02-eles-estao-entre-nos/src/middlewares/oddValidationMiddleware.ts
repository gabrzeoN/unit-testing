import { NextFunction, Request, Response } from "express";
import oddSchema from "../schemas/oddSchema.js";

async function oddValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validation = oddSchema.validate(req.body);
    if (validation.error) return res.sendStatus(422);

    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

export default oddValidationMiddleware;
