import uuid from "uuid";

export class RefreshTokenVO {
  private value: string;

  private constructor(token: string) {
    this.value = token;
  }

  static create(token: string) {
    if (!uuid.validate(token)) {
      throw new Error("Invalid refresh token");
    }

    return new RefreshTokenVO(token);
  }

  get returnValue(): string {
    return this.value;
  }
}
