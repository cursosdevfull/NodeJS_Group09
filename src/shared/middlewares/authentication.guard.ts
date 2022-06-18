import { Request, Response, NextFunction } from "express";
import { TokensService } from "../../users/domain/services/tokens.service";
import { IError } from "../helpers/errors.helper";

export class Authentication {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const headerAuthentication = req.headers.authorization;

    if (headerAuthentication) {
      const partsHeaderAuthentication = headerAuthentication.split(" ");

      if (partsHeaderAuthentication.length === 2) {
        const accessToken = partsHeaderAuthentication[1];

        TokensService.validateAccessToken(accessToken)
          .then((payload: any) => {
            res.locals.roles = payload.roles;
            next();
          })
          .catch((response) => {
            const error: IError = new Error(response.message);
            error.status = response.status;
            next(error);
          });
      } else {
        const error: IError = new Error("You are not authorized");
        error.status = 401;
        next(error);
      }
    } else {
      const error: IError = new Error("You are not authorized");
      error.status = 401;
      next(error);
    }
  }
}
