import { MockUserImplements } from "./repositories/mockUserImplements";
import { UserApplication } from "../../src/users/application/user.application";
import { UserRepository } from "../../src/users/domain/repositories/user.repository";
import { RoleInfrastructure } from "../../src/roles/infrastructure/role.infrastructure";

let mockUserImplements: any, userApplication: any;

describe("user.application", () => {
  beforeEach(() => {
    mockUserImplements = new MockUserImplements();
    userApplication = mockUserImplements.getApplication();
  });

  it("list users", async () => {
    // Preparación

    // Ejecución
    const response = await userApplication.findAll({}, [], {});

    // Comprobación
    mockUserImplements.assert(response);
  });
});
