import { Token } from "../token/type.ts";

export class InvalidPrimaryError extends Error {
  public constructor(token: Token) {
    super(`Invalid Primary ${token.type}:${token.value}`);
  }
}

export class InvalidVariableDeclaration extends Error {
  public constructor(token: Token) {
    super(`Invalid Variable Declaration ${token.type}:${token.value}`);
  }
}
