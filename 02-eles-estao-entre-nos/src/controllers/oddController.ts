import { Request, Response } from "express";
import { oddService } from "../services/oddService.js";

async function isOdd(req: Request, res: Response) {
  try {
    const { number } = req.body;

    const result = oddService.isReallyOdd(number);

    return res.send({ number, result });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function listOVNIS(req: Request, res: Response) {
  try {
    const result = oddService.listOVNIS();

    return res.send({ result });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

export { isOdd, listOVNIS };
