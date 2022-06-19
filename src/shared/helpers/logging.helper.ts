import * as wins from "winston";
const logstash = require("winston-logstash-transport");
export class Logger {
  transports: any[] = [];
  static instance: any;
  public logger: wins.Logger;
  MESSAGE = Symbol.for("message");
  LEVEL = Symbol.for("level");

  private constructor() {
    this.errorFormatter = this.errorFormatter.bind(this);
    this.errorToLog = this.errorToLog.bind(this);
    this.createTagged = this.createTagged.bind(this);
    this.create = this.create.bind(this);
  }

  static getLogger(): wins.Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      Logger.instance
        .addTransport(Transport.console)
        .addTransport(Transport.ekl)
        .create();
    }

    return Logger.instance.logger;
  }

  addTransport(transport: any) {
    this.transports.push(transport);
    return this;
  }

  create() {
    const logger: any = wins.createLogger({
      level: "info",
      transports: this.transports,
      format: wins.format.combine(
        wins.format(this.errorFormatter)(),
        wins.format(this.createTagged)()
      ),
    });

    this.logger = logger;
  }

  createTagged(logEntry: any) {
    const tag = {
      env: "dev",
    };
    const taggedLog = Object.assign(tag, logEntry);
    logEntry[this.MESSAGE] = JSON.stringify(taggedLog);

    return logEntry;
  }

  errorToLog(logEntry: any) {
    const formatted: any = {
      message: null,
      level: "error",
    };

    formatted[this.LEVEL] = "error";

    if (logEntry.message) {
      formatted[this.MESSAGE] = `${logEntry.message}: ${logEntry.stack}`;
    } else {
      formatted[this.MESSAGE] = logEntry.stack;
    }

    return formatted;
  }

  errorFormatter(logEntry: any) {
    if (logEntry instanceof Error) {
      return this.errorToLog(logEntry);
    }

    if (logEntry.stack) {
      logEntry.message = `${logEntry.message}: ${logEntry.stack}`;
    }

    if (logEntry.message?.err instanceof Error) {
      return this.errorToLog(logEntry.message.err);
    }

    logEntry.message = JSON.stringify(logEntry.message);

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

  static get ekl() {
    return new logstash.LogstashTransport({
      host: "localhost",
      port: 1514,
    });
  }
}
