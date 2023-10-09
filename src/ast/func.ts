import { Token } from "../token/type.ts";
import {
  Equality,
  Expression,
  Primary,
  PrimaryType,
  Unary,
  UnaryOperator,
} from "./type.ts";
import { Symbol } from "../token/type.ts";
import { InvalidPrimaryError } from "./error.ts";

export function makeExpression(tokens: Token[]): [Expression, Token[]] {
  return [{} as Expression, tokens];
}

export function makeUnary(tokens: Token[]): [Unary, Token[]] {
  const token = tokens[0];

  if (token.symbol == Symbol.Bang) {
    const operator = UnaryOperator.Bang;
    const [unary, leftTokens] = makeUnary(tokens.slice(1));
    return [{ operator: operator, unary: unary }, leftTokens];
  }
  if (token.symbol == Symbol.Minus) {
    const operator = UnaryOperator.Minus;
    const [unary, leftTokens] = makeUnary(tokens.slice(1));
    return [{ operator: operator, unary: unary }, leftTokens];
  }

  return makePrimary(tokens);
}

export function makePrimary(tokens: Token[]): [Primary, Token[]] {
  const token = tokens[0];
  const leftTokens = tokens.slice(1);

  switch (token.symbol) {
    case Symbol.False:
      return [{
        type: PrimaryType.False,
      }, leftTokens];
    case Symbol.True:
      return [{
        type: PrimaryType.True,
      }, leftTokens];
    case Symbol.Nil:
      return [{
        type: PrimaryType.Nil,
      }, leftTokens];
    case Symbol.Number:
      return [{
        type: PrimaryType.Number,
        value: token.value,
      }, leftTokens];
    case Symbol.String:
      return [{
        type: PrimaryType.String,
        value: token.value,
      }, leftTokens];
  }

  // A grouped expression
  if (token.symbol == Symbol.ParenLeft) {
    let leftTokens = tokens.slice(1); // consume "("
    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ")"
    return [{
      type: PrimaryType.Expression,
      value: expression,
    }, leftTokens];
  }

  throw new InvalidPrimaryError();
}
