import { ValueTypeInTS } from "./type.ts";

export class InvalidTermError extends Error {
  public constructor(left: ValueTypeInTS, op: string, right: ValueTypeInTS) {
    super(`Invalid Term: ${left} ${op} ${right}`);
  }
}

export class InvalidFanctorError extends Error {
  public constructor(left: ValueTypeInTS, op: string, right: ValueTypeInTS) {
    super(`Invalid Fanctor: ${left} ${op} ${right}`);
  }
}

export class InvalidUnaryError extends Error {
  public constructor() {
    super("Invalid Unary");
  }
}

export class InvalidPrimaryError extends Error {
  public constructor() {
    super("Invalid Primary");
  }
}
