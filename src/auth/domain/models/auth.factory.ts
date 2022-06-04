import { AuthModel } from "./auth.model";

export interface IAuth {
  email: string;
  password: string;
}

export class AuthFactory {
  create(auth: IAuth) {
    const email = auth.email;
    const password = auth.password;

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    return new AuthModel(email, password);
  }
}
