import { UserApplication } from "../../../src/users/application/user.application";
import mockUsers from "../mocks/users.json";
import { UserInfrastructure } from "../../../src/users/infrastructure/user.infrastructure";
import { RoleInfrastructure } from "../../../src/roles/infrastructure/role.infrastructure";
import { UserController } from "../../../src/users/interfaces/http/user.controller";

export class MockUserApplication {
  private userInfra: any;
  private roleInfra: any;

  constructor() {
    (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
      findAll: jest.fn().mockResolvedValue(mockUsers),
    });

    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      findAll: jest.fn().mockResolvedValue(mockUsers),
    });

    (RoleInfrastructure as any) = jest.fn().mockReturnValue({
      findByIds: jest.fn(),
    });
  }

  getController() {
    this.userInfra = new UserInfrastructure();
    this.roleInfra = new RoleInfrastructure();
    const userApplication = new UserApplication(this.userInfra, this.roleInfra);

    return new UserController(userApplication);
  }

  assert(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    //expect(result).toEqual(mockUsers);
  }
}
