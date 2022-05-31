import { DatabaseListen } from "./bootstrap";
import { DataSource, DataSourceOptions } from "typeorm";
import yenv from "yenv";

const env = yenv();

let source: DataSource;

export default class DatabaseBootstrap extends DatabaseListen {
  static get dataSource() {
    return source;
  }
  listen(): void {
    throw new Error("Method not implemented.");
  }
  initialize(): Promise<DataSource | Error> {
    const parametersConnection = {
      type: "mysql",
      host: env.DATABASES.MYSQL.HOST || "localhost",
      port: env.DATABASES.MYSQL.PORT || 5200,
      username: env.DATABASES.MYSQL.USERNAME || "root",
      password: (env.DATABASES.MYSQL.PASSWORD || "12345").toString(),
      entities: env.DATABASES.MYSQL.ENTITIES || ["src/**/*.entity.ts"],
      database: env.DATABASES.MYSQL.NAME || "dbnodejs",
      synchronize: env.DATABASES.MYSQL.SYNCHRONIZE || true,
      logging: env.DATABASES.MYSQL.LOGGING || false,
    } as DataSourceOptions;

    const data = new DataSource(parametersConnection);
    source = data;
    return data.initialize();
  }
}
