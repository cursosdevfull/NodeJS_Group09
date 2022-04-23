import express, { Request, Response } from "express";

const router = express.Router();

const uuid = "ee873707-46b3-4f45-8c60-29df637e135c";

router.get("/", (req: Request, res: Response) => {
  res.send("drivers");
});

export default router;
export { uuid };
