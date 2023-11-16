import { ValueTypeInTS } from "./type.ts";

export class InvalidComparisionError extends Error {
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
export class UndefinedVariableError extends Error {
  public constructor(variableName: string) {
    super(`Undefined variable "${variableName}"`);
  }
}
export class InvalidStatementError extends Error {
  public constructor() {
    super("Invalid Statement Error");
  }
}
export class UndefinedFunctionError extends Error {
  public constructor(name: string) {
    super(`Undefined function ${name}`);
  }
}
export class DefinedFunctionError extends Error {
  public constructor(name: string) {
    super(`Function ${name} is already defined.`);
  }
}
export class DefinedClassError extends Error {
  public constructor(name: string) {
    super(`Class ${name} is already defined.`);
  }
}
export class UncallableFunctionError extends Error {
  public constructor(name: string) {
    super(`Function ${name} is not callable.`);
  }
}
