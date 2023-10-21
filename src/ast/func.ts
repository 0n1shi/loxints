import { Token } from "../token/type.ts";
import {
  AST,
  Comparision,
  ComparisionsAndOperator,
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
  UnaryWithOperator,
} from "./type.ts";
import { TokenType } from "../token/type.ts";
import { InvalidPrimaryError } from "./error.ts";

export function makeAST(tokens: Token[]): [AST, Token[]] {
  return makeProgram(tokens);
}

export function makeProgram(tokens: Token[]): [Program, Token[]] {
  const statements: Statement[] = [];
  while (tokens.length > 0) {
    let stmt: Statement;
    [stmt, tokens] = makeStatement(tokens);
    statements.push(stmt);
  }
  return [new Program(statements), []];
}

export function makeStatement(tokens: Token[]): [Statement, Token[]] {
  const first = tokens[0];
  if (first.type == TokenType.Print) {
    const otherTokens = tokens.slice(1);
    let [expression, leftTokens] = makeExpression(otherTokens);
    leftTokens = leftTokens.slice(1);
    return [new PrintStatement(expression), leftTokens];
  }
  let [expression, leftTokens] = makeExpression(tokens);
  leftTokens = leftTokens.slice(1);
  return [new ExpressionStatement(expression), leftTokens];
}

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
    token.type == TokenType.BangEqual ||
    token.type == TokenType.EqualEqual
  ) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    const operator = token.type == TokenType.BangEqual
      ? OperatorForComparisions.BangEqual
      : OperatorForComparisions.EqualEqual;

    let right: Equality;
    [right, leftTokens] = makeComparision(leftTokens);

    equality = new ComparisionsAndOperator(
      equality as Comparision,
      operator,
      right,
    );

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
    token.type == TokenType.Greater ||
    token.type == TokenType.GreaterEqual ||
    token.type == TokenType.Less ||
    token.type == TokenType.LessEqual
  ) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    const operator = token.type == TokenType.Greater
      ? OperatorForTerms.Greater
      : token.type == TokenType.GreaterEqual
      ? OperatorForTerms.GreaterEqual
      : token.type == TokenType.Less
      ? OperatorForTerms.Less
      : OperatorForTerms.LessEqual;

    let right: Comparision;
    [right, leftTokens] = makeTerm(leftTokens);

    comparision = new TermsAndOperator(comparision as Term, operator, right);

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
  while (token.type == TokenType.Minus || token.type == TokenType.Plus) {
    leftTokens = leftTokens.slice(1); // consume "-" or "+"

    const operator = token.type == TokenType.Minus
      ? OperatorForFanctors.Minus
      : OperatorForFanctors.Plus;

    let right: Term;
    [right, leftTokens] = makeFanctor(leftTokens);

    term = new FanctorsAndOperator(term as Fanctor, operator, right);

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
  while (token.type == TokenType.Slash || token.type == TokenType.Star) {
    leftTokens = leftTokens.slice(1); // consume "/" or "*"

    const operator = token.type === TokenType.Slash
      ? OperatorForUnaries.Slash
      : OperatorForUnaries.Star;

    let right: Fanctor;
    [right, leftTokens] = makeUnary(leftTokens);

    fanctor = new UnariesAndOperator(fanctor as Unary, operator, right);

    if (leftTokens.length == 0) break;
    else token = leftTokens[0];
  }

  return [fanctor, leftTokens];
}

export function makeUnary(tokens: Token[]): [Unary, Token[]] {
  const token = tokens[0];

  if (token.type == TokenType.Bang || token.type == TokenType.Minus) {
    const operator = token.type == TokenType.Bang
      ? OperatorForUnary.Bang
      : OperatorForUnary.Minus;
    const [unary, leftTokens] = makeUnary(tokens.slice(1));
    return [new UnaryWithOperator(operator, unary), leftTokens];
  }

  return makePrimary(tokens);
}

export function makePrimary(tokens: Token[]): [Primary, Token[]] {
  const token = tokens[0];
  const leftTokens = tokens.slice(1);

  switch (token.type) {
    case TokenType.False:
      return [new Primary(PrimaryType.False), leftTokens];
    case TokenType.True:
      return [new Primary(PrimaryType.True), leftTokens];
    case TokenType.Nil:
      return [new Primary(PrimaryType.Nil), leftTokens];
    case TokenType.Number:
      return [new Primary(PrimaryType.Number, token.value), leftTokens];
    case TokenType.String:
      return [new Primary(PrimaryType.String, token.value), leftTokens];
  }

  // A grouped expression
  if (token.type == TokenType.ParenLeft) {
    let leftTokens = tokens.slice(1); // consume "("
    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ")"
    return [new Primary(PrimaryType.Group, new Group(expression)), leftTokens];
  }

  throw new InvalidPrimaryError();
}
