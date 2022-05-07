import { DriverController } from "./drivers.controller";
import { DriverApplication } from "../application/driver.application";
import { DriverInfrastructure } from "../infrastructure/driver.infrastructure";
import { BaseRouter } from "../../shared/interfaces/base-router";

const infrastructure = new DriverInfrastructure();
const application = new DriverApplication(infrastructure);
const controller = new DriverController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller);
  }

  mountRoutes(): void {}
}
