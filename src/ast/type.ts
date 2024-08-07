export type AST = Program;

/**
 * Program
 */
export class Program {
  declarations: Declaration[];

  constructor(declarations: Declaration[]) {
    this.declarations = declarations;
  }
}

/**
 * Declaration
 */
export type Declaration =
  | ClassDeclaration
  | FunctionDeclaration
  | VariableDeclaration
  | Statement;

export class ClassDeclaration {
  identifier: string;
  methods: FunctionDeclaration[];
  superClassName?: string;

  constructor(
    identifier: string,
    methods: FunctionDeclaration[],
    superClassName?: string,
  ) {
    this.identifier = identifier;
    this.methods = methods;
    this.superClassName = superClassName;
  }
}

export class FunctionDeclaration {
  identifier: string;
  parameters: string[];
  block: Block;

  constructor(identifier: string, parameters: string[], block: Block) {
    this.identifier = identifier;
    this.parameters = parameters;
    this.block = block;
  }
}

export class VariableDeclaration {
  identifier: string;
  expression?: Expression;

  constructor(identifier: string, expression?: Expression) {
    this.identifier = identifier;
    this.expression = expression;
  }
}

/**
 * Statement
 */
export type Statement =
  | ExpressionStatement
  | ForStatement
  | IfStatement
  | PrintStatement
  | ReturnStatement
  | WhileStatement
  | Block;

export class ExpressionStatement {
  expression: Expression;

  constructor(expression: Expression) {
    this.expression = expression;
  }
}

export class ForStatement {
  initializer?: VariableDeclaration | ExpressionStatement;
  condition?: Expression;
  iteration?: Expression;
  statement: Statement;

  constructor(
    statement: Statement,
    initializer?: VariableDeclaration | ExpressionStatement,
    condition?: Expression,
    iteration?: Expression,
  ) {
    this.statement = statement;
    this.initializer = initializer;
    this.condition = condition;
    this.iteration = iteration;
  }
}

export class IfStatement {
  expression: Expression;
  trueStatement: Statement;
  falseStatement?: Statement;

  constructor(
    expression: Expression,
    trueStatement: Statement,
    falseStatement?: Statement,
  ) {
    this.expression = expression;
    this.trueStatement = trueStatement;
    this.falseStatement = falseStatement;
  }
}

export class PrintStatement {
  expression: Expression;

  constructor(expression: Expression) {
    this.expression = expression;
  }
}

export class ReturnStatement {
  expression?: Expression;

  constructor(expression?: Expression) {
    this.expression = expression;
  }
}

export class WhileStatement {
  expression: Expression;
  statement: Statement;

  constructor(expression: Expression, statement: Statement) {
    this.expression = expression;
    this.statement = statement;
  }
}

export class Block {
  declarations: Declaration[];

  constructor(declarations: Declaration[]) {
    this.declarations = declarations;
  }
}

/**
 * Expression
 */
export type Expression = Assignment;

export type Assignment = AssignmentWithIdentifier | LogicOr;

export type LogicOr = LogicAnd | LogicAndsWithOr;
export class LogicAndsWithOr {
  left: LogicAnd;
  right: LogicAnd;

  constructor(left: LogicAnd, right: LogicAnd) {
    this.left = left;
    this.right = right;
  }
}
export type LogicAnd = Equality | EqualitiesWithAnd;
export class EqualitiesWithAnd {
  left: Equality;
  right: Equality;

  constructor(left: Equality, right: Equality) {
    this.left = left;
    this.right = right;
  }
}

export class AssignmentWithIdentifier {
  identifier: string;
  assignment: Assignment;
  call?: Call;

  constructor(identifier: string, assignment: Assignment, call?: Call) {
    this.identifier = identifier;
    this.assignment = assignment;
    this.call = call;
  }
}

/**
 * Equality
 */
export type Equality = Comparision | ComparisionsAndOperator;

export enum OperatorForComparisions {
  BangEqual = "!=",
  EqualEqual = "==",
}

export class ComparisionsAndOperator {
  left: Comparision;
  operator: OperatorForComparisions;
  right: Comparision;

  constructor(
    left: Comparision,
    operator: OperatorForComparisions,
    right: Comparision,
  ) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

/**
 * Comparision
 */
export type Comparision = Term | TermsAndOperator;

export enum OperatorForTerms {
  Greater = ">",
  GreaterEqual = ">=",
  Less = "<",
  LessEqual = "<=",
}

export class TermsAndOperator {
  left: Term;
  operator: OperatorForTerms;
  right: Term;

  constructor(left: Term, operator: OperatorForTerms, right: Term) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

/**
 * Term
 */
export type Term = Fanctor | FanctorsAndOperator;

export enum OperatorForFanctors {
  Minus = "-",
  Plus = "+",
}

export class FanctorsAndOperator {
  left: Fanctor;
  operator: OperatorForFanctors;
  right: Fanctor;

  constructor(left: Fanctor, operator: OperatorForFanctors, right: Fanctor) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

/**
 * Fanctor
 */
export type Fanctor = Unary | UnariesAndOperator;

export enum OperatorForUnaries {
  Slash = "/",
  Star = "*",
}

export class UnariesAndOperator {
  left: Unary;
  operator: OperatorForUnaries;
  right: Unary;

  constructor(left: Unary, operator: OperatorForUnaries, right: Unary) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

/**
 * Unary
 */
export type Unary = UnaryWithOperator | Call;

export enum OperatorForUnary {
  Bang = "!",
  Minus = "-",
}

export class UnaryWithOperator {
  operator: OperatorForUnary;
  right: Unary;

  constructor(operator: OperatorForUnary, right: Unary) {
    this.operator = operator;
    this.right = right;
  }
}

/**
 * Call
 */
export type Call = Primary | PrimaryWithArgumentsOrGetters;

export class PrimaryWithArgumentsOrGetters {
  primary: Primary;
  argumentsOrGetters: ArgumentsOrGetter[];

  constructor(
    primary: Primary,
    argumentsOrGetters: ArgumentsOrGetter[],
  ) {
    this.primary = primary;
    this.argumentsOrGetters = argumentsOrGetters;
  }
}

export type ArgumentsOrGetter = Arguments | Getter;

/**
 * Arguments
 */
export class Arguments {
  expressions: Expression[];

  constructor(expressions: Expression[]) {
    this.expressions = expressions;
  }
}

/**
 * Property Access
 */
export class Getter {
  identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
  }
}

/**
 * Primary
 */
export enum PrimaryType {
  String = "[string]",
  Number = "[number]",
  True = "[true]",
  False = "[false]",
  Nil = "[nil]",
  Identifier = "[identifier]",
  Group = "[group]",
}

export class Primary {
  type: PrimaryType;
  value?: string | number | boolean | Group;

  constructor(
    type: PrimaryType,
    value?: string | number | boolean | Group,
  ) {
    this.type = type;
    this.value = value;
  }
}

export class Group {
  expression: Expression;
  constructor(expression: Expression) {
    this.expression = expression;
  }
}
