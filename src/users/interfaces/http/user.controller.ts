import { Request, Response } from "express";
import { UserApplication } from "../../application/user.application";

export class UserController {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
  }

  async list(req: Request, res: Response) {
    const users = await this.application.findAll({}, [], {});

    res.json(users);
  }

  async add(req: Request, res: Response) {
    const user = await this.application.add(req.body);

    res.json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.application.update(
      req.body,
      { id: +req.params.id },
      []
    );

    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const user = await this.application.delete({ id: +req.params.id });

    res.json(user);
  }

  async findById(req: Request, res: Response) {
    const user = await this.application.findOne({ id: +req.params.id }, []);

    res.json(user);
  }
}
