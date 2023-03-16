import { NextFunction, Request, Response } from "express";
import { db } from "../database/db";

export async function authValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token.");
  }

  try {
    const { rows: sessions } = await db.query(
      `SELECT *  FROM sessions WHERE token = $1`,
      [token]
    );
    const [session] = sessions;

    if (!session) {
      return res.status(401).send("Session not found.");
    }

    const { rows: users } = await db.query(
      `SELECT * FROM users WHERE id = $1 `,
      [session.userId]
    );
    const [user] = users;

    if (!user) {
      return res.status(401).send("User not found.");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }
}
