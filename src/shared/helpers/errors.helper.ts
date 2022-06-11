import { NextFunction, Request, Response } from "express";
import { Trace } from "./trace.helper";

export interface IError extends Error {
  status?: number;
  traceId?: string;
}

export class HandlerErrors {
  static notFound(req: Request, res: Response, next: NextFunction) {
    const error: Partial<IError> = new Error("Not Found");
    error.status = 404;
    next(error);
  }

  static catchError(
    ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      return ftn(req, res, next).catch((error) => {
        const err: Partial<IError> = new Error("falla intermitente");
        err.message = error.message;
        err.stack = error.stack;
        err.status = 409;

        next(err);
      });
    };
  }

  static generic(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const objError: Partial<IError> = {
      traceId: Trace.traceId(),
      name: error.name,
      status: error.status,
      message: error.message,
    };

    if (process.env.NODE_ENV !== "production") {
      objError.stack = error.stack;
    }

    res.status(error.status).json(objError);
  }
}
