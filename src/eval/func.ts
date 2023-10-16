import {
  OperatorForUnary,
  Primary,
  PrimaryType,
  Unary,
  UnaryWithOperator,
} from "../ast/type.ts";
import { Value, ValueType } from "./type.ts";
import { InvalidPrimaryError } from "./error.ts";

export function evaluateUnary(unary: Unary): Value {
  if (unary instanceof Primary) {
    return evaluatePrimary(unary);
  }
}

export function evaluatePrimary(primary: Primary): Value {
  switch (primary.type) {
    case PrimaryType.Number:
      return new Value(ValueType.Number, primary.value as number);
    case PrimaryType.String:
      return new Value(ValueType.String, primary.value as string);
    case PrimaryType.True:
      return new Value(ValueType.Boolean, true);
    case PrimaryType.False:
      return new Value(ValueType.Boolean, false);
    case PrimaryType.Nil:
      return new Value(ValueType.Nil, null);
    case PrimaryType.Group:
      // TODO
      break;
  }

  throw new InvalidPrimaryError();
}
