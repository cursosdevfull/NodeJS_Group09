import { AuthModel } from "../domain/models/auth.model";
import { AuthRepository } from "../domain/repositories/auth.repository";

export class AuthApplication {
  constructor(private repository: AuthRepository) {}

  login(auth: AuthModel) {
    return this.repository.login(auth);
  }

  getNewAccessToken(refreshToken: string) {
    return this.repository.getNewAccessToken(refreshToken);
  }
}
