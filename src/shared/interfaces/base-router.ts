import express, { Router } from "express";
import CacheRedis from "../helpers/cache.helper";
import { HandlerErrors } from "../helpers/errors.helper";

export abstract class BaseRouter {
  expressRouter: express.Router;

  constructor(private controller: any, private tagName: string = "") {
    this.expressRouter = express.Router();
    this.mountRoutesCommons();
    this.mountRoutes();
  }

  abstract mountRoutes(): void;

  mountRoutesCommons(): void {
    this.expressRouter.get(
      "/",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(this.controller.list)
    );
    this.expressRouter.post("/", HandlerErrors.catchError(this.controller.add));
    this.expressRouter.put(
      "/:id",
      HandlerErrors.catchError(this.controller.update)
    );
    this.expressRouter.delete(
      "/:id",
      HandlerErrors.catchError(this.controller.delete)
    );
    this.expressRouter.get(
      "/:id",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(this.controller.listOne)
    );
    /*this.expressRouter.get("/:id", this.controller.findById); */
  }
}
