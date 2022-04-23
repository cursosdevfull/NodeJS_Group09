import express, { Request, Response } from "express";

const router = express.Router();

router.get("/details", (req: Request, res: Response) => {
  const user = {
    name: "Sergio Hidalgo",
    age: 30,
  };

  res.json(user);
});

router.get("/", (req: Request, res: Response) => {
  const users = [
    {
      name: "John",
      age: 30,
    },
    {
      name: "Jane",
      age: 25,
    },
    {
      name: "Jack",
      age: 20,
    },
  ];

  res.json(users);
});

export default router;
