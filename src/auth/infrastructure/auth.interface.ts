import Result from "../../shared/application/interfaces/result.interface";
import { AuthModel } from "../domain/models/auth.model";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { TokensModel } from "../domain/models/tokens.model";
import DatabaseBootstrap from "../..//bootstrap/database.bootstrap";
import { Repository } from "typeorm";
import { UserEntity } from "../../users/domain/models/user.entity";
import { PasswordService } from "../../users/domain/services/password.service";
import { TokensService } from "../../users/domain/services/tokens.service";
import { ResponseDto } from "../../shared/application/interfaces/dtos/response.dto";
import { Trace } from "../../shared/helpers/trace.helper";

export class AuthInfrastructure implements AuthRepository {
  async login(auth: AuthModel): Promise<Result<TokensModel>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<UserEntity> =
      dataSource.getRepository(UserEntity);

    const user = await repository.findOne({ where: { email: auth.email } });

    if (user) {
      const isPasswordValid = await PasswordService.compare(
        auth.password,
        user.password
      );

      if (isPasswordValid) {
        const tokens = await TokensService.generateTokens({
          email: user.email,
          name: user.name,
        });

        return ResponseDto(Trace.traceId(), tokens);
      } else {
        throw new Error("User is not found");
      }
    } else {
      throw new Error("User is not found");
    }
  }
}
