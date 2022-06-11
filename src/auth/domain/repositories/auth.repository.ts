import Result from "../../../shared/application/interfaces/result.interface";
import { AuthModel } from "../models/auth.model";
import { TokensModel } from "../models/tokens.model";

export interface AuthRepository {
  login(auth: AuthModel): Promise<Result<TokensModel>>;
  getNewAccessToken(refreshToken: string): Promise<Result<TokensModel>>;
}
