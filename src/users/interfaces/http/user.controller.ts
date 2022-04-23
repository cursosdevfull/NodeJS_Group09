import { Request, Response } from "express";
import { UserApplication } from "../../application/user.application";

export class UserController {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
  }

  async list(req: Request, res: Response) {
    const users = await this.application.findAll();

    res.json(users);
  }
}
