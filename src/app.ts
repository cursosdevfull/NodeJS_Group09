import express, { Application, Request, Response } from "express";
import RoutesUser from "./users/interfaces/http/users.route";
import RoutesDriver from "./drivers/interfaces/drivers.route";
import { v4 as uuidv4 } from "uuid";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountMiddlewares();
    this.mountHealthCheck();
    this.mountRoutes();
  }

  mountMiddlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true })); // request.body
    this.expressApp.use((req, res, next) => {
      req.traceId = uuidv4();
      next();
    });
  }

  mountRoutes(): void {
    // this.expressApp.use("/users", new RoutesUser().expressRouter);
    this.expressApp.use("/drivers", new RoutesDriver().expressRouter);
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
