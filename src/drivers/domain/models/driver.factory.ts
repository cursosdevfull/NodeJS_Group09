import { DriverModel } from "./driver.model";

export interface IDriver {
  id: number;
  name: string;
  lastname: string;
  licenseDriver: string;
  active: boolean;
}

export class DriverFactory {
  create(driver: Partial<IDriver>) {
    const id = driver.id || 0;
    const name = driver.name;
    const lastname = driver.lastname;
    const licenseDriver = driver.licenseDriver;
    const active = driver.active || true;

    if (!name) {
      throw new Error("Driver name is required");
    }

    if (!lastname) {
      throw new Error("Driver lastname is required");
    }

    if (!licenseDriver) {
      throw new Error("Driver licenseDriver is required");
    }

    return new DriverModel(id, name, lastname, licenseDriver, active);
  }
}
