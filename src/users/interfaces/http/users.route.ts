import { UserController } from "./user.controller";
import { UserApplication } from "../../application/user.application";
import { UserInfrastructure } from "../../infrastructure/user.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";
import { RoleInfrastructure } from "../../../roles/infrastructure/role.infrastructure";
import CacheRedis from "../../../shared/helpers/cache.helper";
import { HandlerErrors } from "../../../shared/helpers/errors.helper";
import {
  FactoryAWS,
  FactoryAzure,
  FactoryGCP,
  IUploadImage,
} from "../../../shared/infrastructure/upload.middleware";
import { UploadBuilder } from "../../../shared/application/upload-builder";

const infrastructureUser = new UserInfrastructure();
const infrastructureRole = new RoleInfrastructure();
const application = new UserApplication(infrastructureUser, infrastructureRole);
const controller = new UserController(application);

const uploadMiddleware: IUploadImage = new FactoryAWS();

export default class extends BaseRouter {
  constructor() {
    super(controller, "user");
  }

  mountRoutes(): void {}

  override mountRoutesCommons(): void {
    this.expressRouter.get(
      "/",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(controller.list)
    );
    this.expressRouter.post(
      "/",
      uploadMiddleware.save(
        new UploadBuilder()
          .addFieldName("photo")
          .addMaxFileSize(5000000)
          .addDirectory("users/photos")
          .addIsPublic(true)
          .addMimeTypesAllowed(["image/jpeg", "image/png"])
          .build()
      ),
      HandlerErrors.catchError(controller.add)
    );
    this.expressRouter.put("/:id", HandlerErrors.catchError(controller.update));
    this.expressRouter.delete(
      "/:id",
      HandlerErrors.catchError(controller.delete)
    );
    this.expressRouter.get(
      "/:id",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(controller.listOne)
    );
  }
}
