import * as bcrypt from "bcryptjs";

export class PasswordService {
  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  static compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
