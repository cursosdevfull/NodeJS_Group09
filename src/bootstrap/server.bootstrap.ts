import http from "http";
import app from "../app";
import Bootstrap from "./bootstrap";
import yenv from "yenv";

const env = yenv();

export default class ServerBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(app);

      server
        .listen(env.PORT)
        .on("listening", () => {
          resolve(true);
          console.log(`Server is running on port ${env.PORT}`);
        })
        .on("error", reject);
    });
  }
}
