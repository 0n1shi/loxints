import { Token } from "../token/type.ts";
import {
  Comparision,
  ComparisionsAndOperator,
  Equality,
  Expression,
  Fanctor,
  FanctorsAndOperator,
  Group,
  Primary,
  PrimaryValue,
  Term,
  TermsAndOperator,
  UnariesAndOperator,
  Unary,
} from "./type.ts";
import { TokenType } from "../token/type.ts";
import { InvalidPrimaryError } from "./error.ts";

export function makeExpression(tokens: Token[]): [Expression, Token[]] {
  return makeEquality(tokens);
}

export function makeEquality(tokens: Token[]): [Equality, Token[]] {
  let equality: Equality;
  let leftTokens: Token[];
  [equality, leftTokens] = makeComparision(tokens);

  if (leftTokens.length == 0) return [equality, leftTokens];

  let token = leftTokens[0];
  while (
    token.symbol == TokenType.BangEqual ||
    token.symbol == TokenType.EqualEqual
  ) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    const operator = token.symbol;

    let right: Equality;
    [right, leftTokens] = makeComparision(leftTokens);

    equality = {
      left: equality,
      operator: operator,
      right: right,
    } as ComparisionsAndOperator;

    if (leftTokens.length == 0) break;
    else token = leftTokens[0];
  }

  return [equality, leftTokens];
}

export function makeComparision(tokens: Token[]): [Comparision, Token[]] {
  let comparision: Comparision;
  let leftTokens: Token[];
  [comparision, leftTokens] = makeTerm(tokens);

  if (leftTokens.length == 0) return [comparision, leftTokens];

  let token = leftTokens[0];
  while (
    token.symbol == TokenType.Greater ||
    token.symbol == TokenType.GreaterEqual ||
    token.symbol == TokenType.Less ||
    token.symbol == TokenType.LessEqual
  ) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    const operator = token.symbol;

    let right: Comparision;
    [right, leftTokens] = makeTerm(leftTokens);

    comparision = {
      left: comparision,
      operator: operator,
      right: right,
    } as TermsAndOperator;

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
  while (token.symbol == TokenType.Minus || token.symbol == TokenType.Plus) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    const operator = token.symbol;

    let right: Term;
    [right, leftTokens] = makeFanctor(leftTokens);

    term = {
      left: term,
      operator: operator,
      right: right,
    } as FanctorsAndOperator;

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
  while (token.symbol == TokenType.Slash || token.symbol == TokenType.Star) {
    leftTokens = leftTokens.slice(1); // consume "/" or "*"

    const operator = token.symbol;

    let right: Fanctor;
    [right, leftTokens] = makeUnary(leftTokens);

    fanctor = {
      left: fanctor,
      operator: operator,
      right: right,
    } as UnariesAndOperator;

    if (leftTokens.length == 0) break;
    else token = leftTokens[0];
  }

  return [fanctor, leftTokens];
}

export function makeUnary(tokens: Token[]): [Unary, Token[]] {
  const token = tokens[0];

  if (token.symbol == TokenType.Bang || token.symbol == TokenType.Minus) {
    const operator = token.symbol;
    const [unary, leftTokens] = makeUnary(tokens.slice(1));
    return [{ operator: operator, right: unary }, leftTokens];
  }

  return makePrimary(tokens);
}

export function makePrimary(tokens: Token[]): [Primary, Token[]] {
  const token = tokens[0];
  const leftTokens = tokens.slice(1);

  switch (token.type) {
    case TokenType.False:
      return [{
        type: TokenType.False,
      } as PrimaryValue, leftTokens];
    case TokenType.True:
      return [{
        type: TokenType.True,
      } as PrimaryValue, leftTokens];
    case TokenType.Nil:
      return [{
        type: TokenType.Nil,
      } as PrimaryValue, leftTokens];
    case TokenType.Number:
      return [{
        type: TokenType.Number,
        value: token.value,
      } as PrimaryValue, leftTokens];
    case TokenType.String:
      return [{
        type: TokenType.String,
        value: token.value,
      } as PrimaryValue, leftTokens];
  }

  // A grouped expression
  if (token.type == TokenType.ParenLeft) {
    let leftTokens = tokens.slice(1); // consume "("
    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ")"
    return [new Group(expression), leftTokens];
  }

  throw new InvalidPrimaryError();
}
