import http from "http";
import app from "../app";
import Bootstrap from "./bootstrap";

export default class ServerBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(app);

      server
        .listen(3000)
        .on("listening", () => {
          resolve(true);
          console.log("Server is running on port 3000");
        })
        .on("error", reject);
    });
  }
}
