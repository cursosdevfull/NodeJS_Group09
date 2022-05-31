import * as wins from "winston";

export class Logger {
  transports: any[] = [];
  static instance: any;
  private logger: wins.Logger;
  MESSAGE = Symbol.for("message");

  private constructor() {}

  static getLogger(): wins.Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      Logger.instance.addTransport(Transport.console).create();
    }

    return Logger.instance.logger;
  }

  addTransport(transport: any) {
    this.transports.push(transport);
    return this;
  }

  create() {
    const logger = wins.createLogger({
      level: "info",
      transports: this.transports,
      format: wins.format.combine(wins.format(this.createTagged)()),
    });

    this.logger = logger;
  }

  createTagged(logEntry: any) {
    const tag = {
      env: "dev",
    };
    const taggedLog = Object.assign(tag, logEntry);
    logEntry["message"] = JSON.stringify(taggedLog);
    return logEntry;
  }
}

export class Transport {
  static get console() {
    return new wins.transports.Console({
      format: wins.format.combine(
        wins.format.colorize(),
        wins.format.cli({
          colors: {
            error: "red",
            warn: "yellow",
            info: "green",
            debug: "blue",
            verbose: "cyan",
            http: "magenta",
          },
        })
      ),
      handleExceptions: true,
    });
  }
}
