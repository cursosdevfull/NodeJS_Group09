import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
const serverBootstrap = new ServerBootstrap();
const databaseBootstrap = new DatabaseBootstrap();

(async () => {
  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
  } catch (error) {
    console.log("Error", error);
  }
})();
