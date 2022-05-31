import { DriverApplication } from "../application/driver.application";
import { Response, Request } from "express";
import { DriverModel } from "../domain/models/driver.model";
import { DriverFactory } from "../domain/models/driver.factory";
import { Trace } from "../../shared/helpers/trace.helper";
import { Logger, Transport } from "../../shared/helpers/logging.helper";

export class DriverController {
  constructor(private application: DriverApplication) {
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
      message: "List all drivers",
      query: JSON.stringify({}),
      datetime: new Date(),
    });
    const drivers = await this.application.findAll({}, [], {});
    res.json(drivers);
  }

  async listOne(req: Request, res: Response) {
    Trace.traceId(true);
    const drivers = await this.application.findOne({ id: +req.params.id }, []);
    res.json(drivers);
  }

  async add(req: Request, res: Response) {
    Trace.traceId(true);
    const driver = new DriverFactory().create(req.body);
    const result = await this.application.add(driver);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    Trace.traceId(true);
    const driverToInsert: any = { id: req.params.id, ...req.body };
    const driver = new DriverFactory().create(driverToInsert);
    const result = await this.application.update(driver, {}, []);
    res.json(result);
  }
  async delete(req: Request, res: Response) {
    Trace.traceId(true);
    const id = +req.params.id;
    const drivers = await this.application.delete({ id });
    res.json(drivers);
  }
}
