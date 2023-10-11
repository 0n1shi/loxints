import { Token } from "../token/type.ts";
import {
  Comparision,
  ComparisionOperator,
  ComparisionWithTermsAndOperator,
  Equality,
  Expression,
  Fanctor,
  FanctorOperator,
  FanctorWithUnariesAndOperator,
  Primary,
  PrimaryType,
  Term,
  TermOperator,
  TermWithFanctorsAndOperator,
  Unary,
  UnaryOperator,
} from "./type.ts";
import { Symbol } from "../token/type.ts";
import { InvalidPrimaryError } from "./error.ts";

export function makeExpression(tokens: Token[]): [Expression, Token[]] {
  return [{} as Expression, tokens];
}

export function makeComparision(tokens: Token[]): [Comparision, Token[]] {
  let comparision: Comparision;
  let leftTokens: Token[];
  [comparision, leftTokens] = makeTerm(tokens);

  if (leftTokens.length == 0) return [comparision, leftTokens];

  let token = leftTokens[0];
  while (
    token.symbol == Symbol.Greater ||
    token.symbol == Symbol.GreaterEqual ||
    token.symbol == Symbol.Less ||
    token.symbol == Symbol.LessEqual
  ) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    let operator: ComparisionOperator;
    switch (token.symbol) {
      case Symbol.Greater:
        operator = ComparisionOperator.Greater;
        break;
      case Symbol.GreaterEqual:
        operator = ComparisionOperator.GreaterEqual;
        break;
      case Symbol.Less:
        operator = ComparisionOperator.Less;
        break;
      case Symbol.LessEqual:
        operator = ComparisionOperator.LessEqual;
    }

    let right: Comparision;
    [right, leftTokens] = makeComparision(leftTokens);

    comparision = {
      left: comparision,
      operator: operator,
      right: right,
    } as ComparisionWithTermsAndOperator;

    if (leftTokens.length == 0) break;
    else token = leftTokens[0];
  }

  return [comparision, leftTokens];
}

export function makeTerm(tokens: Token[]): [Term, Token[]] {
  let term: Term;
  let leftTokens: Token[];
  [term, leftTokens] = makeFanctor(tokens);

  if (leftTokens.length == 0) return [term, leftTokens];

  let token = leftTokens[0];
  while (token.symbol == Symbol.Minus || token.symbol == Symbol.Plus) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    const operator = token.symbol == Symbol.Minus
      ? TermOperator.Minus
      : TermOperator.Plus;

    let right: Term;
    [right, leftTokens] = makeTerm(leftTokens);

    term = {
      left: term,
      operator: operator,
      right: right,
    } as TermWithFanctorsAndOperator;

    if (leftTokens.length == 0) break;
    else token = leftTokens[0];
  }

  return [term, leftTokens];
}

export function makeFanctor(tokens: Token[]): [Fanctor, Token[]] {
  let fanctor: Fanctor;
  let leftTokens: Token[];
  [fanctor, leftTokens] = makeUnary(tokens);

  if (leftTokens.length == 0) return [fanctor, leftTokens];

  let token = leftTokens[0];
  while (token.symbol == Symbol.Slash || token.symbol == Symbol.Star) {
    leftTokens = leftTokens.slice(1); // consume "/" or "*"

    const operator = token.symbol == Symbol.Slash
      ? FanctorOperator.Slash
      : FanctorOperator.Star;

    let right: Fanctor;
    [right, leftTokens] = makeUnary(leftTokens);

    fanctor = {
      left: fanctor,
      operator: operator,
      right: right,
    } as FanctorWithUnariesAndOperator;

    if (leftTokens.length == 0) break;
    else token = leftTokens[0];
  }

  return [fanctor, leftTokens];
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
