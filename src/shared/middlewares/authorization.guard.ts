import { Request, Response, NextFunction } from "express";
import { IError } from "../helpers/errors.helper";

export class Authorization {
  static canActivate(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const roles = res.locals.roles;
      if (rolesAllowed.some((role) => roles.includes(role))) {
        next();
      } else {
        const error: IError = new Error("You are not authorized");
        error.status = 401;
        next(error);
      }
    };
  }
  /* static canActivate(req: Request, res: Response, next: NextFunction) {
    const roles = res.locals.roles;

    if (roles.includes("SUPERADMIN")) {
      next();
    } else {
      const error: IError = new Error("You are not authorized");
      error.status = 401;
      next(error);
    }
  } */
}
