import {
  AST,
  Comparision,
  ComparisionsAndOperator,
  Declaration,
  Equality,
  Expression,
  ExpressionStatement,
  Fanctor,
  FanctorsAndOperator,
  Group,
  OperatorForComparisions,
  OperatorForFanctors,
  OperatorForTerms,
  OperatorForUnaries,
  OperatorForUnary,
  Primary,
  PrimaryType,
  PrintStatement,
  Program,
  Statement,
  Term,
  TermsAndOperator,
  UnariesAndOperator,
  Unary,
  VariableDeclaration,
} from "../ast/type.ts";
import { Environment, Value, ValueType } from "./type.ts";
import {
  InvalidComparision,
  InvalidFanctorError,
  InvalidTermError,
} from "./error.ts";
import {
  isInstanceOfComparision,
  isInstanceOfFanctor,
  isInstanceOfTerm,
  isInstanceOfUnary,
} from "./util.ts";

export function execute(ast: AST) {
  const environment: Environment = new Map<string, Value>();
  return executeProgram(ast as Program, environment);
}

export function executeProgram(program: Program, environment: Environment) {
  for (const declaration of program.declarations) {
    executeDeclaration(declaration, environment);
  }
}

export function executeDeclaration(
  declaration: Declaration,
  environment: Environment,
): Value {
  if (declaration instanceof VariableDeclaration) {
    const val = evaluateExpression(declaration.expression!);
    environment.set(declaration.identifier, val);
    return new Value(ValueType.Nil, null);
  }
  return evaluateStatement(declaration as Statement);
}

export function evaluateStatement(statement: Statement): Value {
  const expr = evaluateExpression(statement.expression);
  if (statement instanceof PrintStatement) {
    console.log(expr.value); // print
    return new Value(ValueType.Nil, null);
  }
  return expr;
}

export function evaluateExpression(expression: Expression): Value {
  return evaluateEquality(expression);
}

export function evaluateEquality(equality: Equality): Value {
  if (isInstanceOfComparision(equality)) {
    return evaluateComparision(equality as Comparision);
  }

  const op = (equality as ComparisionsAndOperator).operator;
  const left = evaluateComparision((equality as ComparisionsAndOperator).left);
  const right = evaluateComparision(
    (equality as ComparisionsAndOperator).right,
  );
  switch (op) {
    case OperatorForComparisions.BangEqual:
      return new Value(ValueType.Boolean, left.value !== right.value);
    case OperatorForComparisions.EqualEqual:
      return new Value(ValueType.Boolean, left.value === right.value);
  }
}

export function evaluateComparision(comparision: Comparision): Value {
  if (isInstanceOfTerm(comparision)) {
    return evaluateTerm(comparision as Term);
  }

  const op = (comparision as TermsAndOperator).operator;
  const left = evaluateTerm((comparision as TermsAndOperator).left);
  const right = evaluateTerm((comparision as TermsAndOperator).right);

  if (left.type == ValueType.Number && right.type == ValueType.Number) {
    switch (op) {
      case OperatorForTerms.Less:
        return new Value(
          ValueType.Boolean,
          (left.value as number) < (right.value as number),
        );
      case OperatorForTerms.LessEqual:
        return new Value(
          ValueType.Boolean,
          (left.value as number) <= (right.value as number),
        );
      case OperatorForTerms.Greater:
        return new Value(
          ValueType.Boolean,
          (left.value as number) > (right.value as number),
        );
      case OperatorForTerms.GreaterEqual:
        return new Value(
          ValueType.Boolean,
          (left.value as number) >= (right.value as number),
        );
    }
  }

  throw new InvalidComparision(left.value, op, right.value);
}

export function evaluateTerm(term: Term): Value {
  if (isInstanceOfFanctor(term)) {
    return evaluateFanctor(term as Fanctor);
  }

  const op = (term as FanctorsAndOperator).operator;
  const left = evaluateFanctor((term as FanctorsAndOperator).left);
  const right = evaluateFanctor((term as FanctorsAndOperator).right);

  switch (op) {
    case OperatorForFanctors.Plus:
      if (left.type == ValueType.Number && right.type == ValueType.Number) {
        return new Value(
          ValueType.Number,
          (left.value as number) + (right.value as number),
        );
      }
      if (left.type == ValueType.String && right.type == ValueType.String) {
        return new Value(
          ValueType.String,
          (left.value as string) + (right.value as string),
        );
      }
      if (left.type == ValueType.String && right.type == ValueType.Number) {
        return new Value(
          ValueType.String,
          (left.value as string) + (right.value as number).toString(),
        );
      }
      if (left.type == ValueType.Number && right.type == ValueType.String) {
        return new Value(
          ValueType.String,
          (left.value as number).toString() + (right.value as string),
        );
      }
      break;
    case OperatorForFanctors.Minus:
      if (left.type == ValueType.Number && right.type == ValueType.Number) {
        return new Value(
          ValueType.Number,
          (left.value as number) - (right.value as number),
        );
      }
  }

  throw new InvalidTermError(left.value, op, right.value);
}

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
  const right = evaluateUnary(unary.right);

  switch (op) {
    case OperatorForUnary.Bang:
      return new Value(right.type, !right.value);
    case OperatorForUnary.Minus:
      return new Value(right.type, -right.value!);
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
      return evaluateExpression((primary.value as Group).expression);
  }
}
