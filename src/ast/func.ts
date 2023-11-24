import { Token } from "../token/type.ts";
import {
  Arguments,
  ArgumentsOrGetter,
  Assignment,
  AssignmentWithIdentifier,
  AST,
  Block,
  Call,
  ClassDeclaration,
  Comparision,
  ComparisionsAndOperator,
  Declaration,
  EqualitiesWithAnd,
  Equality,
  Expression,
  ExpressionStatement,
  Fanctor,
  FanctorsAndOperator,
  ForStatement,
  FunctionDeclaration,
  Getter,
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
  PrimaryWithArgumentsOrGetters,
  PrintStatement,
  Program,
  ReturnStatement,
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
import { InvalidPrimaryError } from "./error.ts";

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

  // class declaration
  if (first.type == TokenType.Class) {
    return makeClassDeclaration(tokens);
  }

  // function declaration
  if (first.type == TokenType.Fun) {
    return makeFunctionDeclaration(tokens);
  }

  // variable declaration
  if (first.type == TokenType.Var) {
    return makeVariableDeclaration(tokens);
  }

  return makeStatement(tokens);
}

export function makeClassDeclaration(
  tokens: Token[],
): [ClassDeclaration, Token[]] {
  let leftTokens = tokens.slice(1); // consume "class"

  const identifider = leftTokens[0].value as string; // must be class name
  leftTokens = leftTokens.slice(1); // consume IDENTIFIDER

  // check if inheritance
  let superClassName: string | undefined = undefined;
  let nextToken = leftTokens[0];
  if (nextToken && nextToken.type == TokenType.Less) {
    const identifider = leftTokens[1].value as string;
    superClassName = identifider;
    leftTokens = leftTokens.slice(2); // consume "<" and IDENTIFIER
  }
  leftTokens = leftTokens.slice(1); // consume "{"

  const methods: FunctionDeclaration[] = [];
  nextToken = leftTokens[0];
  while (nextToken && nextToken.type != TokenType.BraceRight) {
    let classMethod: FunctionDeclaration;
    [classMethod, leftTokens] = makeClassMethodDeclaration(leftTokens);
    methods.push(classMethod);
    nextToken = leftTokens[0];
  }
  leftTokens = leftTokens.slice(1); // consume "}"

  return [new ClassDeclaration(identifider, methods, superClassName), leftTokens];
}

function makeClassMethodDeclaration(
  tokens: Token[],
): [FunctionDeclaration, Token[]] {
  const identifider = tokens[0].value as string; // must be function name
  let leftTokens = tokens.slice(2); // consume "[identifider]" and "("

  const parameters: string[] = [];
  let nextToken = leftTokens[0];
  while (nextToken && nextToken.type != TokenType.ParenRight) {
    parameters.push(nextToken.value as string);
    leftTokens = leftTokens.slice(1); // consume "[identifider]"

    nextToken = leftTokens[0];
    if (nextToken && nextToken.type == TokenType.Comma) {
      leftTokens = leftTokens.slice(1); // consume ","
      nextToken = leftTokens[0];
    }
  }

  leftTokens = leftTokens.slice(1); // consume ")"

  let block: Block;
  [block, leftTokens] = makeBlock(leftTokens);

  return [new FunctionDeclaration(identifider, parameters, block), leftTokens];
}

export function makeFunctionDeclaration(
  tokens: Token[],
): [FunctionDeclaration, Token[]] {
  let leftTokens = tokens.slice(1); // consume "fun"

  const identifider = leftTokens[0].value as string; // must be function name
  leftTokens = leftTokens.slice(2); // consume "[identifider]" and "("

  const parameters: string[] = [];
  let nextToken = leftTokens[0];
  while (nextToken && nextToken.type != TokenType.ParenRight) {
    parameters.push(nextToken.value as string);
    leftTokens = leftTokens.slice(1); // consume "[identifider]"

    nextToken = leftTokens[0];
    if (nextToken && nextToken.type == TokenType.Comma) {
      leftTokens = leftTokens.slice(1); // consume ","
      nextToken = leftTokens[0];
    }
  }

  leftTokens = leftTokens.slice(1); // consume ")"

  let block: Block;
  [block, leftTokens] = makeBlock(leftTokens);

  return [new FunctionDeclaration(identifider, parameters, block), leftTokens];
}

export function makeVariableDeclaration(
  tokens: Token[],
): [VariableDeclaration, Token[]] {
  let leftTokens = tokens.slice(1); // consume "var"

  const identifider = leftTokens[0].value as string; // must be variable name
  leftTokens = leftTokens.slice(1); // consume "[identifider]"

  const nextToken = leftTokens[0];
  if (nextToken && nextToken.type == TokenType.Equal) {
    leftTokens = leftTokens.slice(1); //  consume "="

    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ";"

    return [new VariableDeclaration(identifider, expression), leftTokens];
  }

  return [new VariableDeclaration(identifider), leftTokens];
}

export function makePrintStatement(tokens: Token[]): [PrintStatement, Token[]] {
  let leftTokens = tokens.slice(1); // consume "print"
  let expression: Expression;
  [expression, leftTokens] = makeExpression(leftTokens);
  leftTokens = leftTokens.slice(1); // consume ";"
  return [new PrintStatement(expression), leftTokens];
}

export function makeForStatement(tokens: Token[]): [ForStatement, Token[]] {
  let leftTokens = tokens.slice(2); // consume "for" and "("

  let initializer: VariableDeclaration | ExpressionStatement | undefined =
    undefined;
  let nextToken = leftTokens[0];
  if (nextToken && nextToken.type != TokenType.SemiColon) { // has initializer
    if (nextToken && nextToken.type == TokenType.Var) {
      [initializer, leftTokens] = makeVariableDeclaration(leftTokens);
    } else {
      [initializer, leftTokens] = makeExpressionStatement(leftTokens);
    }
  } else {
    leftTokens = leftTokens.slice(1); // consume ";"
  }

  let condition: Expression | undefined = undefined;
  nextToken = leftTokens[0];
  if (nextToken && nextToken.type != TokenType.SemiColon) {
    [condition, leftTokens] = makeExpression(leftTokens);
  }
  leftTokens = leftTokens.slice(1); // consume ";"

  let iteration: Expression | undefined = undefined;
  nextToken = leftTokens[0];
  if (nextToken && nextToken.type != TokenType.ParenRight) {
    [iteration, leftTokens] = makeExpression(leftTokens);
  }

  leftTokens = leftTokens.slice(1); // consume ")"

  let statement: Statement;
  [statement, leftTokens] = makeStatement(leftTokens);

  return [
    new ForStatement(statement, initializer, condition, iteration),
    leftTokens,
  ];
}

export function makeIfStatement(tokens: Token[]): [IfStatement, Token[]] {
  let leftTokens = tokens.slice(2); // consume "if" and "("
  let expression: Expression;
  [expression, leftTokens] = makeExpression(leftTokens);
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

export function makeWhileStatement(tokens: Token[]): [WhileStatement, Token[]] {
  let lefttokens = tokens.slice(2); // consume "while" and "("
  let expression: Expression;
  [expression, lefttokens] = makeExpression(lefttokens);
  lefttokens = lefttokens.slice(1); // consume ")"

  let statement: Statement;
  [statement, lefttokens] = makeStatement(lefttokens);

  return [
    new WhileStatement(expression, statement),
    lefttokens,
  ];
}

export function makeBlock(tokens: Token[]): [Block, Token[]] {
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

export function makeExpressionStatement(
  tokens: Token[],
): [ExpressionStatement, Token[]] {
  let [expression, leftTokens] = makeExpression(tokens);
  leftTokens = leftTokens.slice(1); // consume ";"
  return [new ExpressionStatement(expression), leftTokens];
}

export function makeReturnStatement(
  tokens: Token[],
): [ReturnStatement, Token[]] {
  let expression: Expression | undefined = undefined;
  let leftTokens = tokens.slice(1); // consume "return"
  const nextToken = leftTokens[0];
  if (nextToken.type == TokenType.SemiColon) {
    leftTokens = leftTokens.slice(1); // consume ";"
    return [new ReturnStatement(), leftTokens];
  }
  [expression, leftTokens] = makeExpression(leftTokens);
  leftTokens = leftTokens.slice(1); // consume ";"
  return [new ReturnStatement(expression), leftTokens];
}

export function makeStatement(tokens: Token[]): [Statement, Token[]] {
  const first = tokens[0];

  // print statement
  if (first.type == TokenType.Print) {
    return makePrintStatement(tokens);
  }

  if (first.type == TokenType.Return) {
    return makeReturnStatement(tokens);
  }

  // for statement
  if (first.type == TokenType.For) {
    return makeForStatement(tokens);
  }

  // if statement
  if (first.type == TokenType.If) {
    return makeIfStatement(tokens);
  }

  // while statement
  if (first.type == TokenType.While) {
    return makeWhileStatement(tokens);
  }

  // block
  if (first.type == TokenType.BraceLeft) {
    return makeBlock(tokens);
  }

  // expression statement
  return makeExpressionStatement(tokens);
}

export function makeExpression(tokens: Token[]): [Expression, Token[]] {
  return makeAssignment(tokens);
}

export function makeAssignment(tokens: Token[]): [Assignment, Token[]] {
  // check if it's an assignment first.
  let call: Call;
  let leftTokens: Token[] = [];
  [call, leftTokens] = makeCall(tokens);
  if (leftTokens.length > 0 && leftTokens[0].type == TokenType.Equal) {
    leftTokens = leftTokens.slice(1); // consume "="
    let assignment: Assignment;
    [assignment, leftTokens] = makeAssignment(leftTokens);

    if (call instanceof PrimaryWithArgumentsOrGetters) {
      const tail: Getter = (call as PrimaryWithArgumentsOrGetters)
        .argumentsOrGetters.pop() as Getter;
      if (
        (call as PrimaryWithArgumentsOrGetters).argumentsOrGetters.length == 0
      ) {
        call = new Primary(
          PrimaryType.Identifier,
          (call as PrimaryWithArgumentsOrGetters).primary.value as string,
        );
      }
      return [
        new AssignmentWithIdentifier(tail.identifier, assignment, call),
        leftTokens,
      ];
    }
    return [
      new AssignmentWithIdentifier(call.value as string, assignment),
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

  if (token?.type == TokenType.Bang || token?.type == TokenType.Minus) {
    const operator = token.type == TokenType.Bang
      ? OperatorForUnary.Bang
      : OperatorForUnary.Minus;
    const [unary, leftTokens] = makeUnary(tokens.slice(1));
    return [new UnaryWithOperator(operator, unary), leftTokens];
  }

  return makeCall(tokens);
}

export function makeCall(tokens: Token[]): [Call, Token[]] {
  let primary: Primary;
  let leftTokens: Token[];
  [primary, leftTokens] = makePrimary(tokens);

  const argumentsOrGetters: ArgumentsOrGetter[] = [];
  let nextToken = leftTokens[0];
  while (nextToken) {
    if (nextToken.type == TokenType.ParenLeft) {
      let args: Arguments;
      [args, leftTokens] = makeArguments(leftTokens);
      argumentsOrGetters.push(args);
      nextToken = leftTokens[0];
    } else if (nextToken.type == TokenType.Dot) {
      let getter: Getter;
      [getter, leftTokens] = makeGetter(leftTokens);
      argumentsOrGetters.push(getter);
      nextToken = leftTokens[0];
    } else break;
  }

  if (argumentsOrGetters.length == 0) return [primary, leftTokens];
  return [
    new PrimaryWithArgumentsOrGetters(primary, argumentsOrGetters),
    leftTokens,
  ];
}

export function makeGetter(tokens: Token[]): [Getter, Token[]] {
  let leftTokens = tokens.slice(1); // consume "."
  const token = leftTokens[0];
  leftTokens = leftTokens.slice(1); // consume IDENTIFIER
  return [new Getter(token.value as string), leftTokens];
}

export function makeArguments(
  tokens: Token[],
): [Arguments, Token[]] {
  let leftTokens = tokens.slice(1); // consume "("

  const expressions: Expression[] = [];
  let nextToken = leftTokens[0];
  while (nextToken && nextToken.type != TokenType.ParenRight) {
    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);

    expressions.push(expression);

    nextToken = leftTokens[0];
    if (nextToken && nextToken.type == TokenType.Comma) {
      leftTokens = leftTokens.slice(1); // consume ","
      nextToken = leftTokens[0];
    }
  }

  leftTokens = leftTokens.slice(1); // consume ")"

  return [
    new Arguments(expressions),
    leftTokens,
  ];
}

export function makePrimary(tokens: Token[]): [Primary, Token[]] {
  const token = tokens[0];
  const leftTokens = tokens.slice(1);

  switch (token?.type) {
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
    case TokenType.This:
      return [new Primary(PrimaryType.Identifier, "this"), leftTokens];
    case TokenType.Super:
      return [new Primary(PrimaryType.Identifier, "super"), leftTokens];
    case TokenType.Identifier:
      return [new Primary(PrimaryType.Identifier, token.value), leftTokens];
  }

  // A grouped expression
  if (token?.type == TokenType.ParenLeft) {
    let leftTokens = tokens.slice(1); // consume "("
    let expression: Expression;
    [expression, leftTokens] = makeExpression(leftTokens);
    leftTokens = leftTokens.slice(1); // consume ")"
    return [new Primary(PrimaryType.Group, new Group(expression)), leftTokens];
  }

  throw new InvalidPrimaryError(token);
}
