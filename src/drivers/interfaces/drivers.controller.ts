import { DriverApplication } from "../application/driver.application";
import { Response, Request } from "express";
import { DriverModel } from "../domain/models/driver.model";
import { DriverFactory } from "../domain/models/driver.factory";

export class DriverController {
  constructor(private application: DriverApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    const drivers = await this.application.findAll({}, [], {});
    res.json(drivers);
  }

  async listOne(req: Request, res: Response) {
    const drivers = await this.application.findOne({ id: +req.params.id }, []);
    res.json(drivers);
  }

  async add(req: Request, res: Response) {
    const driver = new DriverFactory().create(req.body);
    const result = await this.application.add(driver);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const driverToInsert: any = { id: req.params.id, ...req.body };
    const driver = new DriverFactory().create(driverToInsert);
    const result = await this.application.update(driver, {}, []);
    res.json(result);
  }
  async delete(req: Request, res: Response) {
    const id = +req.params.id;
    const drivers = await this.application.delete({ id });
    res.json(drivers);
  }
}
