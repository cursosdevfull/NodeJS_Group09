import { DatabaseListen } from "./bootstrap";
import { DataSource, DataSourceOptions } from "typeorm";

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
      host: process.env.DATABASE_MYSQL_HOST || "localhost",
      port: process.env.DATABASE_MYSQL_PORT || 5200,
      username: process.env.DATABASE_MYSQL_USERNAME || "root",
      password: process.env.DATABASE_MYSQL_PASSWORD || "12345",
      entities: [process.env.DATABASE_MYSQL_ENTITIES || "src/**/*.entity.ts"],
      database: process.env.DATABASE_MYSQL_NAME || "dbnodejs",
      synchronize: process.env.DATABASE_MYSQL_SYNCHRONIZE || true,
      logging: process.env.DATABASE_MYSQL_LOGGING || false,
    } as DataSourceOptions;

    const data = new DataSource(parametersConnection);
    source = data;
    return data.initialize();
  }
}
