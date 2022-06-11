import { Request, Response, NextFunction } from "express";
import RedisBootstrap from "src/bootstrap/redis.bootstrap";

export default class CacheRedis {
  static handle(tagName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let key = tagName;

      if (req.query) {
        for (const prop in req.query) {
          key += `_${req.query[prop]}`;
        }
      }

      if (req.params) {
        for (const prop in req.params) {
          key += `_${req.params[prop]}`;
        }
      }

      if (req.body) {
        for (const prop in req.body) {
          key += `_${req.body[prop]}`;
        }
      }

      const results: any = await RedisBootstrap.get(key);

      if (results) {
        console.log("Response from cache");
        res.json(JSON.parse(results));
      } else {
        res.locals.cacheKey = key;
        next();
      }
    };
  }
}
