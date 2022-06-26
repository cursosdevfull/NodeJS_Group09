import { UserInfrastructure } from "../../../src/users/infrastructure/user.infrastructure";
import { RoleInfrastructure } from "../../../src/roles/infrastructure/role.infrastructure";
import { UserApplication } from "../../../src/users/application/user.application";
import mockUsers from "../mocks/users.json";

export class MockUserImplements {
  private userInfra: any;
  private roleInfra: any;

  constructor() {
    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      findAll: jest.fn().mockResolvedValue(mockUsers),
    });

    (RoleInfrastructure as any) = jest.fn().mockReturnValue({
      findByIds: jest.fn(),
    });
  }

  getApplication() {
    this.userInfra = new UserInfrastructure();
    this.roleInfra = new RoleInfrastructure();

    return new UserApplication(this.userInfra, this.roleInfra);
  }

  assert(response: any) {
    expect(response).toHaveProperty("traceId");
    expect(response).toHaveProperty("payload");
    expect(response).toHaveProperty("payload.data");
    expect(response.payload.data).not.toBeNull();
    expect(Array.isArray(response.payload.data)).toBeTruthy();
    expect(this.userInfra.findAll).toHaveBeenCalled();
    expect(this.userInfra.findAll).toHaveBeenCalledTimes(1);
  }
}
