import * as httpMock from "node-mocks-http";
import { MockUserApplication } from "./repositories/mockUserApplication";
import RedisBootstrap from "../../src/bootstrap/redis.bootstrap";

let req: any, res: any, next: any;
let mockUserApplication: any, userController: any;
let redisBootstrap: RedisBootstrap;

describe("user controller", () => {
  beforeAll(async () => {
    redisBootstrap = new RedisBootstrap();
    await redisBootstrap.initialize();
  });

  afterAll(() => {
    redisBootstrap.getConnection().disconnect();
  });

  beforeEach(() => {
    req = httpMock.createResponse();
    res = httpMock.createResponse();
    next = null;

    mockUserApplication = new MockUserApplication();
    userController = mockUserApplication.getController();
  });

  it(
    "list users",
    async () => {
      //Ejecución
      await userController.list(req, res);

      //Comprobación
      mockUserApplication.assert(res);
    },
    24 * 60 * 60 * 1000
  );
});
