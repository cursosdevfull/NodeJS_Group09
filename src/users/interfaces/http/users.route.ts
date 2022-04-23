import express, { Request, Response } from "express";
import { UserController } from "./user.controller";
import { UserApplication } from "../../application/user.application";
import { UserInfrastructure } from "../../infrastructure/user.infrastructure";

const infrastructure = new UserInfrastructure();
const application = new UserApplication(infrastructure);
const controller = new UserController(application);

const router = express.Router();

router.get("/details", (req: Request, res: Response) => {
  const user = {
    name: "Sergio Hidalgo",
    age: 30,
  };

  res.json(user);
});

/* router.get("/", controller.list.bind(controller)); */
/* router.get("/", (req, res) => {
  controller.list(req, res);
}); */
router.get("/", controller.list);

export default router;
