import { UserController } from "./user.controller";
import { UserApplication } from "../../application/user.application";
import { UserInfrastructure } from "../../infrastructure/user.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";

const infrastructure = new UserInfrastructure();
const application = new UserApplication(infrastructure);
const controller = new UserController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller);
  }

  mountRoutes(): void {}
}
