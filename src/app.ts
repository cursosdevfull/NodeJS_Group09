import express, { Application, Request, Response } from "express";
import routesUsers from "./users/interfaces/users.route";
import routesDrivers from "./drivers/interfaces/drivers.route";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountHealthCheck();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.expressApp.use("/users", routesUsers);
    this.expressApp.use("/drivers", routesDrivers);
  }

  mountHealthCheck(): void {
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("All is good!");
    });

    this.expressApp.get("/healthcheck", (req, res) => {
      res.send("All is good!");
    });
  }
}

export default new App().expressApp;
