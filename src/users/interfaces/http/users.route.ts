import { UserController } from "./user.controller";
import { UserApplication } from "../../application/user.application";
import { UserInfrastructure } from "../../infrastructure/user.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";
import { RoleInfrastructure } from "../../../roles/infrastructure/role.infrastructure";

const infrastructureUser = new UserInfrastructure();
const infrastructureRole = new RoleInfrastructure();
const application = new UserApplication(infrastructureUser, infrastructureRole);
const controller = new UserController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller, "user");
  }

  mountRoutes(): void {}
}
