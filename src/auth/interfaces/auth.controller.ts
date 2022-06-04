import { Trace } from "../../shared/helpers/trace.helper";
import { Logger } from "../../shared/helpers/logging.helper";
import { AuthApplication } from "../application/auth.application";
import { Request, Response } from "express";

export class AuthController {
  constructor(private application: AuthApplication) {
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    Logger.getLogger().info({
      typeElement: "DriverController",
      typeAction: "login",
      traceId: Trace.traceId(true),
      message: "Login",
      query: JSON.stringify({ email, password }),
      datetime: new Date(),
    });

    const result = await this.application.login({ email, password });
    res.json(result);
  }
}
