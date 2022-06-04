import { DriverModel } from "../../domain/models/driver.model";
import Result from "../../../shared/application/interfaces/result.interface";
import { DTOAbstract } from "../../../shared/application/interfaces/dtos/abstract.dto";

const FilterFieldActiveInDriver = (driver: DriverModel) => {
  const obj = Object.assign({}, driver);
  delete obj.active;
  return obj;
};

export interface CB<T> {
  cb(result: Result<T>): Result<T>;
}

export class DriverDTO extends DTOAbstract<DriverModel> {
  callback(result: Result<DriverModel>): Result<DriverModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInDriver);
    } else {
      delete (result.payload.data as DriverModel).active;
    }

    return result;
  }
}
