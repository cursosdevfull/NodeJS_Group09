import { DataSource } from "typeorm";
export default abstract class Bootstrap {
  abstract initialize(): Promise<boolean | Error | DataSource>;
}

export abstract class DatabaseListen extends Bootstrap {
  abstract listen(): void;
}
