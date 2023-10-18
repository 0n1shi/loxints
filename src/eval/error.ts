import { ValueTypeInTS } from "./type.ts";

export class InvalidComparision extends Error {
  public constructor(left: ValueTypeInTS, op: string, right: ValueTypeInTS) {
    super(`Invalid Comparision: ${left} ${op} ${right}`);
  }
}

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
