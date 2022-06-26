import app from "../../src/app";
import request from "supertest";
import DatabaseBootstrap from "../../src/bootstrap/database.bootstrap";
import RedisBootstrap from "../../src/bootstrap/redis.bootstrap";

const databaseBootstrap = new DatabaseBootstrap();
const redisBootstrap = new RedisBootstrap();

const tokens = {
  VALID:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNlcmdpb0Bjb3JyZW8uY29tIiwibmFtZSI6IlNlcmdpbyIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFUT1IiXSwiaWF0IjoxNjU2MTg2MzI2LCJleHAiOm51bGx9.wvVd13j_Kp7xKuXGHRG_wHOQj9tGKYZNl7PfUMMys4I",
  INVALID:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDcxMDM1MDAsImV4cCI6NzY0NzEwMzUwMCwibmFtZSI6IlNlcmdpbyIsImxhc3RuYW1lIjoiSGlkYWxnbyIsInJvbGVzIjpbeyJkYXRlQ3JlYXRlZCI6IjIwMjItMDItMDVUMTU6NDM6NDAuMDAwWiIsImRhdGVVcGRhdGVkIjoiMjAyMi0wMi0wNVQxNTo0NzoyMy4wMDBaIiwiYWN0aXZlIjp0cnVlLCJpZCI6MSwibmFtZSI6IkFETUlOIiwiYWN0aW9ucyI6Ik1FRElDU19MSVNULE1FRElDU19JTlNFUlQsTUVESUNTX1VQREFURSxNRURJQ1NfUEFHRSxNRURJQ1NfREVMRVRFLFVTRVJTX0xJU1QsVVNFUlNfSU5TRVJULFVTRVJTX1VQREFURSxVU0VSU19QQUdFLFVTRVJTX0RFTEVURSJ9XX0._BFm9Fu6KVuvP9lJU4_g3Qo8MI0bqCx6KXInb64HI",
};

const TIMEOUT = 24 * 60 * 60 * 1000;

describe("user route", () => {
  beforeAll(async () => {
    await databaseBootstrap.initialize();
    await redisBootstrap.initialize();
  });

  afterAll(async () => {
    databaseBootstrap.closeConnection();
    redisBootstrap.getConnection().disconnect();
  });

  it(
    "list users without token",
    async () => {
      //Preparación
      const rq = request(app);

      //Ejecución
      const response: any = await rq.get("/users");

      //Comprobación
      expect(response.status).toBe(401);
      expect(response.res.statusMessage).toBe("Unauthorized");
    },
    TIMEOUT
  );

  it(
    "list users with token valid",
    async () => {
      //Preparación
      const rq = request(app);

      //Ejecución
      const response: any = await rq
        .get("/users")
        .set("authorization", `Bearer ${tokens.VALID}`);

      //Comprobación
      console.log("response text", response.text);
      expect(JSON.parse(response.text)).toHaveProperty("traceId");
      expect(JSON.parse(response.text)).toHaveProperty("payload");
      expect(JSON.parse(response.text)).toHaveProperty("payload.data");
      expect(
        Array.isArray(JSON.parse(response.text).payload.data)
      ).toBeTruthy();
    },
    TIMEOUT
  );

  it(
    "list users with token invalid",
    async () => {
      //Preparación
      const rq = request(app);

      //Ejecución
      const response: any = await rq
        .get("/users")
        .set("authorization", `Bearer ${tokens.INVALID}`);

      //Comprobación
      expect(response.status).toBe(401);
      expect(response.res.statusMessage).toBe("Unauthorized");
    },
    TIMEOUT
  );
});
