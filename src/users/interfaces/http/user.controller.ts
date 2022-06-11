import { Request, Response } from "express";
import RedisBootstrap from "src/bootstrap/redis.bootstrap";
import { Logger } from "src/shared/helpers/logging.helper";
import { Trace } from "src/shared/helpers/trace.helper";
import { UserFactory } from "src/users/domain/models/user.factory";
import { UserApplication } from "../../application/user.application";

export class UserController {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "DriverController",
      typeAction: "list",
      traceId: Trace.traceId(true),
      message: "List all users",
      query: JSON.stringify({}),
      datetime: new Date(),
    });

    const users = await this.application.findAll({}, ["roles"], {});
    RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(users));

    console.log("Response from mysql");

    res.json(users);
  }

  async listOne(req: Request, res: Response) {
    Trace.traceId(true);
    const users = await this.application.findOne({ id: +req.params.id }, [
      "roles",
    ]);
    res.json(users);
  }

  async add(req: Request, res: Response) {
    Trace.traceId(true);
    const user = new UserFactory().create(req.body);
    const result = await this.application.add(user);

    RedisBootstrap.clear("user");

    res.json(result);
  }

  async update(req: Request, res: Response) {
    Trace.traceId(true);
    const userToInsert: any = { id: req.params.id, ...req.body };
    const user = new UserFactory().create(userToInsert);
    const result = await this.application.update(user, {}, []);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    Trace.traceId(true);
    const id = +req.params.id;
    const users = await this.application.delete({ id });
    res.json(users);
  }
}
