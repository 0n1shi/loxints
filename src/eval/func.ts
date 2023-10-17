import {
  Fanctor,
  OperatorForUnaries,
  OperatorForUnary,
  Primary,
  PrimaryType,
  UnariesAndOperator,
  Unary,
} from "../ast/type.ts";
import { Value, ValueType } from "./type.ts";
import { InvalidFanctorError, InvalidPrimaryError } from "./error.ts";
import { isInstanceOfUnary } from "./util.ts";

export function evaluateFanctor(fanctor: Fanctor): Value {
  if (isInstanceOfUnary(fanctor)) {
    return evaluateUnary(fanctor as Unary);
  }

  const op = (fanctor as UnariesAndOperator).operator;
  const left = evaluateUnary((fanctor as UnariesAndOperator).left);
  const right = evaluateUnary((fanctor as UnariesAndOperator).right);
  switch (op) {
    case OperatorForUnaries.Star:
      if (right.type == ValueType.Number) {
        if (left.type == ValueType.Number) {
          return new Value(
            ValueType.Number,
            (left.value as number) * (right.value as number),
          );
        }
        if (left.type == ValueType.String) {
          let txt = "";
          for (let i = 0; i < (right.value as number); i++) {
            txt += left.value as string;
          }
          return new Value(ValueType.String, txt);
        }
      }
      break;
    case OperatorForUnaries.Slash:
      if (left.type == ValueType.Number && right.type == ValueType.Number) {
        return new Value(
          ValueType.Number,
          (left.value as number) / (right.value as number),
        );
      }
      break;
  }
  throw new InvalidFanctorError(left.value, op, right.value);
}

export function evaluateUnary(unary: Unary): Value {
  if (unary instanceof Primary) {
    return evaluatePrimary(unary);
  }

  const op = unary.operator;
  const val = evaluateUnary(unary.right);
  switch (op) {
    case OperatorForUnary.Bang:
      return new Value(val.type, !val.value);
    case OperatorForUnary.Minus:
      return new Value(val.type, -val.value!);
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
