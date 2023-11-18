import {
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
  ReturnStatement,
  Statement,
  Term,
  TermsAndOperator,
  UnariesAndOperator,
  Unary,
  UnaryWithOperator,
  VariableDeclaration,
  WhileStatement,
} from "../ast/type.ts";
import {
  Class,
  ClassInstance,
  Environment,
  ReturnValueError,
  UserFunction,
  Value,
  ValueType,
} from "./type.ts";
import {
  DefinedClassError,
  DefinedFunctionError,
  InvalidComparisionError,
  InvalidFanctorError,
  InvalidStatementError,
  InvalidTermError,
  RuntimeError,
  UncallableFunctionError,
  UndefinedFunctionError,
  UndefinedVariableError,
} from "./error.ts";
import {
  isInstanceOfCall,
  isInstanceOfComparision,
  isInstanceOfFanctor,
  isInstanceOfTerm,
  isInstanceOfUnary,
} from "./util.ts";
import { builtinEnvironment } from "./builtin.ts";

export function execute(ast: AST) {
  return executeProgram(ast as Program, builtinEnvironment);
}

export function executeProgram(program: Program, environment: Environment) {
  for (const declaration of program.declarations) {
    evaluateDeclaration(declaration, environment);
  }
}

export function evaluateClassDeclaration(
  classDeclaration: ClassDeclaration,
  environment: Environment,
): Value {
  const identifier = classDeclaration.identifier;
  if (environment.has(identifier)) {
    throw new DefinedClassError(identifier);
  }
  environment.add(
    identifier,
    new Value(ValueType.Class, new Class(identifier)),
  );
  return new Value(ValueType.Nil, null);
}

export function evaluateFunctionDeclaration(
  functionDeclaration: FunctionDeclaration,
  environment: Environment,
): Value {
  const identifier = functionDeclaration.identifier;
  if (environment.has(identifier)) {
    throw new DefinedFunctionError(identifier);
  }
  environment.add(
    identifier,
    new Value(
      ValueType.UserFunction,
      new UserFunction(
        functionDeclaration.parameters,
        functionDeclaration.block,
        environment,
      ),
    ),
  );
  return new Value(ValueType.Nil, null);
}

export function evaluateVariableDeclaration(
  variableDeclaration: VariableDeclaration,
  environment: Environment,
): Value {
  const val = evaluateExpression(variableDeclaration.expression!, environment);
  environment.add(variableDeclaration.identifier, val);
  return new Value(ValueType.Nil, null);
}

export function evaluateDeclaration(
  declaration: Declaration,
  environment: Environment,
): Value {
  if (declaration instanceof ClassDeclaration) {
    return evaluateClassDeclaration(declaration, environment);
  }
  if (declaration instanceof FunctionDeclaration) {
    return evaluateFunctionDeclaration(declaration, environment);
  }
  if (declaration instanceof VariableDeclaration) {
    return evaluateVariableDeclaration(declaration, environment);
  }
  return evaluateStatement(declaration as Statement, environment);
}

export function evaluateIfStatement(
  statement: IfStatement,
  environment: Environment,
) {
  const val = evaluateExpression(statement.expression, environment);
  if (val.value) {
    evaluateStatement(statement.trueStatement, environment);
  } else if (statement.falseStatement) {
    evaluateStatement(statement.falseStatement, environment);
  }
  return new Value(ValueType.Nil, null);
}

export function evaluatePrintStatement(
  statement: PrintStatement,
  environment: Environment,
): Value {
  const value = evaluateExpression(statement.expression, environment);
  console.log(value.value); // print
  return new Value(ValueType.Nil, null);
}

export function evaluateWhileStatement(
  statement: WhileStatement,
  environment: Environment,
): Value {
  while (evaluateExpression(statement.expression, environment).value) {
    evaluateStatement(statement.statement, environment);
  }
  return new Value(ValueType.Nil, null);
}

export function evaluateBlock(
  statement: Block,
  environment: Environment,
): Value {
  const env = new Environment(environment);
  for (const declaration of statement.declarations) {
    evaluateDeclaration(declaration, env);
  }
  return new Value(ValueType.Nil, null);
}

export function evaluateReturnStatement(
  statement: ReturnStatement,
  environment: Environment,
): Value {
  if (statement.expression) {
    const val = evaluateExpression(statement.expression, environment);
    throw new ReturnValueError(val);
  }
  throw new ReturnValueError(new Value(ValueType.Nil, null));
}

export function evaluateExpressionStatement(
  statement: ExpressionStatement,
  environment: Environment,
): Value {
  return evaluateExpression(statement.expression, environment);
}

export function evaluateForStatement(
  statement: ForStatement,
  environment: Environment,
): Value {
  const forEnv = new Environment(environment);

  if (statement.initializer) {
    if (statement.initializer instanceof VariableDeclaration) {
      evaluateVariableDeclaration(statement.initializer, forEnv);
    } else {
      evaluateExpressionStatement(statement.initializer, forEnv);
    }
  }

  while (
    statement.condition == undefined ||
    evaluateExpression(statement.condition, forEnv).value
  ) {
    evaluateStatement(statement.statement, forEnv);
    if (statement.iteration) evaluateExpression(statement.iteration, forEnv);
  }

  return new Value(ValueType.Nil, null);
}

export function evaluateStatement(
  statement: Statement,
  environment: Environment,
): Value {
  if (statement instanceof ForStatement) {
    return evaluateForStatement(statement, environment);
  }
  if (statement instanceof IfStatement) {
    return evaluateIfStatement(statement, environment);
  }
  if (statement instanceof WhileStatement) {
    return evaluateWhileStatement(statement, environment);
  }
  if (statement instanceof Block) {
    return evaluateBlock(statement, environment);
  }
  if (statement instanceof PrintStatement) {
    return evaluatePrintStatement(statement, environment);
  }
  if (statement instanceof ReturnStatement) {
    return evaluateReturnStatement(statement, environment);
  }
  if (statement instanceof ExpressionStatement) {
    return evaluateExpressionStatement(statement, environment);
  }

  throw new InvalidStatementError();
}

export function evaluateExpression(
  expression: Expression,
  environment: Environment,
): Value {
  return evaluateAssignment(expression, environment);
}

export function evaluateAssignment(
  assignment: Assignment,
  environment: Environment,
): Value {
  if (assignment instanceof AssignmentWithIdentifier) {
    // class instance setter
    if (assignment.call) {
      const instance = evaluateCall(assignment.call, environment);
      if (instance.type != ValueType.ClassInstance) {
        throw new RuntimeError(
          "Invalid assignment: value must be class instance.",
        );
      }

      const val = evaluateAssignment(assignment.assignment, environment);
      (instance.value as ClassInstance).set(assignment.identifier, val);
      return val;
    }

    // variable assignment
    if (!environment.has(assignment.identifier)) {
      throw new UndefinedVariableError(assignment.identifier);
    }
    const val = evaluateAssignment(assignment.assignment, environment);
    environment.put(assignment.identifier, val);
    return val;
  }
  return evaluateLogicOr(assignment as Equality, environment);
}

export function evaluateLogicOr(
  logicOr: LogicOr,
  environment: Environment,
) {
  if (logicOr instanceof LogicAndsWithOr) {
    const left = evaluateLogicAnd(logicOr.left, environment);
    const right = evaluateLogicAnd(logicOr.right, environment);
    return new Value(ValueType.Boolean, left.value || right.value);
  }
  return evaluateLogicAnd(logicOr, environment);
}

export function evaluateLogicAnd(
  logicAnd: LogicAnd,
  environment: Environment,
) {
  if (logicAnd instanceof EqualitiesWithAnd) {
    const left = evaluateEquality(logicAnd.left, environment);
    const right = evaluateEquality(logicAnd.right, environment);
    return new Value(ValueType.Boolean, left.value && right.value);
  }
  return evaluateEquality(logicAnd, environment);
}

export function evaluateEquality(
  equality: Equality,
  environment: Environment,
): Value {
  if (isInstanceOfComparision(equality)) {
    return evaluateComparision(equality as Comparision, environment);
  }

  const op = (equality as ComparisionsAndOperator).operator;
  const left = evaluateComparision(
    (equality as ComparisionsAndOperator).left,
    environment,
  );
  const right = evaluateComparision(
    (equality as ComparisionsAndOperator).right,
    environment,
  );
  switch (op) {
    case OperatorForComparisions.BangEqual:
      return new Value(ValueType.Boolean, left.value != right.value);
    case OperatorForComparisions.EqualEqual:
      return new Value(ValueType.Boolean, left.value == right.value);
  }
}

export function evaluateComparision(
  comparision: Comparision,
  environment: Environment,
): Value {
  if (isInstanceOfTerm(comparision)) {
    return evaluateTerm(comparision as Term, environment);
  }

  const op = (comparision as TermsAndOperator).operator;
  const left = evaluateTerm(
    (comparision as TermsAndOperator).left,
    environment,
  );
  const right = evaluateTerm(
    (comparision as TermsAndOperator).right,
    environment,
  );

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

  throw new InvalidComparisionError(left.value, op, right.value);
}

export function evaluateTerm(term: Term, environment: Environment): Value {
  if (isInstanceOfFanctor(term)) {
    return evaluateFanctor(term as Fanctor, environment);
  }

  const op = (term as FanctorsAndOperator).operator;
  const left = evaluateFanctor((term as FanctorsAndOperator).left, environment);
  const right = evaluateFanctor(
    (term as FanctorsAndOperator).right,
    environment,
  );

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

export function evaluateFanctor(
  fanctor: Fanctor,
  environment: Environment,
): Value {
  if (isInstanceOfUnary(fanctor)) {
    return evaluateUnary(fanctor as Unary, environment);
  }

  const op = (fanctor as UnariesAndOperator).operator;
  const left = evaluateUnary((fanctor as UnariesAndOperator).left, environment);
  const right = evaluateUnary(
    (fanctor as UnariesAndOperator).right,
    environment,
  );

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

export function evaluateUnary(unary: Unary, environment: Environment): Value {
  if (isInstanceOfCall(unary)) {
    return evaluateCall(unary as Call, environment);
  }

  const op = (unary as UnaryWithOperator).operator;
  const right = evaluateUnary((unary as UnaryWithOperator).right, environment);

  switch (op) {
    case OperatorForUnary.Bang:
      return new Value(right.type, !right.value);
    case OperatorForUnary.Minus:
      return new Value(right.type, -right.value!);
  }
}

export function evaluateCall(call: Call, environment: Environment): Value {
  if (call instanceof Primary) {
    return evaluatePrimary(call, environment);
  }

  const name = call.primary.value as string;
  const func = environment.get(name);
  if (func == undefined) throw new UndefinedFunctionError(name);

  if (func.type == ValueType.NativeFunction) {
    let returned: any;
    call.arguments.forEach((args, i) => {
      const argVals = [];
      for (const expression of args.expressions) {
        const val = evaluateExpression(expression, environment);
        argVals.push(val.value);
      }
      const f = (i === 0 ? func.value : returned) as (...args: any[]) => any;
      returned = f(...argVals);
    });

    let valueType = ValueType.Nil;
    switch (typeof returned) {
      case "number":
        valueType = ValueType.Number;
        break;
      case "string":
        valueType = ValueType.String;
        break;
      case "function":
        valueType = ValueType.NativeFunction;
        break;
    }

    return new Value(valueType, returned);
  }

  if (func.type == ValueType.UserFunction) {
    let returnedValue: Value = new Value(ValueType.Nil, null);
    call.arguments.forEach((args, i) => {
      const userFunction =
        (i == 0 ? func.value : returnedValue.value) as unknown as UserFunction;
      const values: Value[] = [];

      // evaluate args
      for (const expression of args.expressions) {
        const val = evaluateExpression(expression, environment);
        values.push(val);
      }

      // bind args into env for the function
      const envForCall = new Environment(userFunction.environment);
      userFunction.parameters.forEach((v, i) => {
        envForCall.add(v, values[i]);
      });

      try {
        evaluateBlock(userFunction.block, envForCall);
      } catch (e) {
        if (e instanceof ReturnValueError) {
          returnedValue = e.value;
        } else {
          throw e;
        }
      }
    });
    return returnedValue;
  }

  if (func.type == ValueType.Class) {
    return new Value(ValueType.ClassInstance, new ClassInstance(name));
  }

  throw new UncallableFunctionError(name);
}

export function evaluatePrimary(
  primary: Primary,
  environment: Environment,
): Value {
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
    case PrimaryType.Identifier: {
      const val = environment.get(primary.value as string);
      if (val === undefined) {
        throw new UndefinedVariableError(primary.value as string);
      }
      return val;
    }
    case PrimaryType.Group:
      return evaluateExpression(
        (primary.value as Group).expression,
        environment,
      );
  }
}
