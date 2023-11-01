import { Token } from "../token/type.ts";
import {
  Assignment,
  AssignmentWithIdentifier,
  AST,
  Block,
  Comparision,
  ComparisionsAndOperator,
  Declaration,
  EqualitiesWithAnd,
  Equality,
  Expression,
  ExpressionStatement,
  Fanctor,
  FanctorsAndOperator,
  Group,
  IfStatement,
  LogicAnd,
  LogicAndsWithOr,
  LogicOr,
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
  VariableDeclaration,
  WhileStatement,
} from "./type.ts";
import { TokenType } from "../token/type.ts";
import { InvalidPrimaryError, InvalidVariableDeclaration } from "./error.ts";

export function makeAST(tokens: Token[]): [AST, Token[]] {
  return makeProgram(tokens);
}

export function makeProgram(tokens: Token[]): [Program, Token[]] {
  const declarations: Declaration[] = [];
  while (tokens.length > 0) {
    let declaration: Declaration;
    [declaration, tokens] = makeDeclaration(tokens);
    declarations.push(declaration);
  }
  return [new Program(declarations), []];
}

export function makeDeclaration(tokens: Token[]): [Declaration, Token[]] {
  const first = tokens[0];

  // variable declaration
  if (first.type == TokenType.Var) {
    return variableDeclaration(tokens);
  }

  return makeStatement(tokens);
}

export function variableDeclaration(
  tokens: Token[],
): [VariableDeclaration, Token[]] {
  let leftTokens = tokens.slice(1); // consume "var"

  const identifider = leftTokens[0].value as string; // must be variable name
  leftTokens = leftTokens.slice(1); // consume "[identifider]"

  const nextToken = leftTokens[0];
  if (nextToken.type == TokenType.Equal) {
    leftTokens = leftTokens.slice(1); //  consume "="

    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ";"

    return [new VariableDeclaration(identifider, expression), leftTokens];
  }

  return [new VariableDeclaration(identifider), leftTokens];
}

export function makeStatement(tokens: Token[]): [Statement, Token[]] {
  const first = tokens[0];

  // print statement
  if (first.type == TokenType.Print) {
    const otherTokens = tokens.slice(1); // consume "print"
    let [expression, leftTokens] = makeExpression(otherTokens);
    leftTokens = leftTokens.slice(1); // consume ";"
    return [new PrintStatement(expression), leftTokens];
  }

  // for statement
  // if (first.type == TokenType.For) {
  //   let leftTokens = tokens.slice(2); // consume "for" and "("
  //   let initializer: VariableDeclaration | ExpressionStatement | undefined =
  //     undefined;

  //   const nextToken = leftTokens[0];
  //   switch (nextToken.type) {
  //     case TokenType.SemiColon:
  //       break; // no initializer
  //     case TokenType.Var:
  //       [initializer, leftTokens] = makeDeclaration(leftTokens);
  //   }
  // }

  // if statement
  if (first.type == TokenType.If) {
    const otherTokens = tokens.slice(2); // consume "if" and "("
    let [expression, leftTokens] = makeExpression(otherTokens);
    leftTokens = leftTokens.slice(1); // consume ")";

    let trueStatement: Statement;
    [trueStatement, leftTokens] = makeStatement(leftTokens); // true statement

    const nextToken = leftTokens[0];
    let falseStatement: Statement | undefined = undefined;
    if (nextToken && nextToken.type == TokenType.Else) {
      leftTokens = leftTokens.slice(1); // consume "else"
      [falseStatement, leftTokens] = makeStatement(leftTokens);
    }

    return [
      new IfStatement(expression, trueStatement, falseStatement),
      leftTokens,
    ];
  }

  // while statement
  if (first.type == TokenType.While) {
    let leftTokens = tokens.slice(2); // consume "while" and "("
    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ")"

    let statement: Statement;
    [statement, leftTokens] = makeStatement(leftTokens);

    return [
      new WhileStatement(expression, statement),
      leftTokens,
    ];
  }

  // block
  if (first.type == TokenType.BraceLeft) {
    let leftTokens = tokens.slice(1); // consume "{"
    let nextToken = leftTokens[0];
    const declarations: Declaration[] = [];
    while (nextToken && nextToken.type != TokenType.BraceRight) {
      let declaration: Declaration;
      [declaration, leftTokens] = makeDeclaration(leftTokens);
      declarations.push(declaration);
      nextToken = leftTokens[0];
    }
    leftTokens = leftTokens.slice(1); // consume "}"
    return [new Block(declarations), leftTokens];
  }

  // expression statement
  let [expression, leftTokens] = makeExpression(tokens);
  leftTokens = leftTokens.slice(1);
  return [new ExpressionStatement(expression), leftTokens];
}

export function makeExpression(tokens: Token[]): [Expression, Token[]] {
  return makeAssignment(tokens);
}

export function makeAssignment(tokens: Token[]): [Assignment, Token[]] {
  const firstToken = tokens[0];
  const secondToken = tokens[1];
  if (
    firstToken?.type == TokenType.Identifier &&
    secondToken?.type == TokenType.Equal
  ) {
    const [assignment, leftTokens] = makeAssignment(tokens.slice(2)); // consume [IDENTIFIER] and "="
    return [
      new AssignmentWithIdentifier(firstToken.value as string, assignment),
      leftTokens,
    ];
  }

  return makeLogicOr(tokens);
}

export function makeLogicOr(tokens: Token[]): [LogicOr, Token[]] {
  let logicOr: LogicOr;
  let leftTokens: Token[];
  [logicOr, leftTokens] = makeLogicAnd(tokens);

  if (leftTokens.length == 0) return [logicOr, leftTokens];

  let nextToken = leftTokens[0];
  while (nextToken.type == TokenType.Or) {
    leftTokens = leftTokens.slice(1); // consume "or"

    let right: LogicAnd;
    [right, leftTokens] = makeLogicAnd(leftTokens);

    logicOr = new LogicAndsWithOr(logicOr as LogicAnd, right);

    if (leftTokens.length == 0) break;
    else nextToken = leftTokens[0];
  }

  return [logicOr, leftTokens];
}

export function makeLogicAnd(tokens: Token[]): [LogicAnd, Token[]] {
  let logicAnd: LogicAnd;
  let leftTokens: Token[];
  [logicAnd, leftTokens] = makeEquality(tokens);

  if (leftTokens.length == 0) return [logicAnd, leftTokens];

  let nextToken = leftTokens[0];
  while (nextToken.type == TokenType.And) {
    leftTokens = leftTokens.slice(1); // consume "and"

    let right: Equality;
    [right, leftTokens] = makeEquality(leftTokens);

    logicAnd = new EqualitiesWithAnd(logicAnd as Equality, right);

    if (leftTokens.length == 0) break;
    else nextToken = leftTokens[0];
  }

  return [logicAnd, leftTokens];
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
    case TokenType.Identifier:
      return [new Primary(PrimaryType.Identifier, token.value), leftTokens];
  }

  // A grouped expression
  if (token.type == TokenType.ParenLeft) {
    let leftTokens = tokens.slice(1); // consume "("
    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ")"
    return [new Primary(PrimaryType.Group, new Group(expression)), leftTokens];
  }

  throw new InvalidPrimaryError(token);
}
