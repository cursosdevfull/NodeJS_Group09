import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import { DataSource } from "typeorm";
import RedisBootstrap from "./bootstrap/redis.bootstrap";
const serverBootstrap = new ServerBootstrap();
const databaseBootstrap = new DatabaseBootstrap();
const redisBootstrap = new RedisBootstrap();

export interface Options {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  entities: string[];
  database: string;
  synchronize: boolean;
  logging: boolean;
}

(async () => {
  try {
    const tasks = [
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
      redisBootstrap.initialize(),
    ];
    const tasksCompleted = await Promise.all(tasks);

    const options: Options = Object.assign(
      {},
      (tasksCompleted[1] as DataSource).options
    ) as Options;

    console.log(
      "Connected to database",
      options.database,
      options.host,
      options.port,
      options.logging
    );
    console.log("Server started");
  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
})();
