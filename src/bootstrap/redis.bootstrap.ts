import IORedis from "ioredis";
import yenv from "yenv";

const env = yenv();

let client: any;

export default class RedisBootstrap {
  private client: IORedis.Redis;

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const connectionParameters = {
        host: env.DATABASES.REDIS.HOST,
        port: env.DATABASES.REDIS.PORT,
        password: env.DATABASES.REDIS.PASS,
        maxRetriesPerRequest: 5,
      };

      this.client = new IORedis(connectionParameters);

      this.client
        .on("connect", () => {
          console.log("Redis connected");
          resolve(true);
        })
        .on("error", (error: Error) => {
          console.log("Redis error", error);
          reject(error);
        });

      client = this.client;
    });
  }

  getConnection() {
    return this.client;
  }

  static async get(key: string) {
    return await client.get(key);
  }

  static async set(key: string, value: string) {
    await client.set(key, value, "PX", 24 * 60 * 60 * 1000);
  }

  static async clear(prefix: string = "") {
    const keys = await client.keys(`${prefix}*`);
    const pipeline = client.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });

    return pipeline.exec();
  }
}
