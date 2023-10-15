import { TokenType } from "../token/type.ts";

/**
 * Expression
 */
export type Expression = Equality;

/**
 * Equality
 */
export type Equality = Comparision | ComparisionsAndOperator;

export type OperatorForComparisions =
  | TokenType.BangEqual
  | TokenType.EqualEqual;

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

export type TermOperator =
  | TokenType.Greater
  | TokenType.GreaterEqual
  | TokenType.Less
  | TokenType.LessEqual;

export class TermsAndOperator {
  left: Term;
  operator: TermOperator;
  right: Term;

  constructor(left: Term, operator: TermOperator, right: Term) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

/**
 * Term
 */
export type Term = Fanctor | FanctorsAndOperator;

export type OperatorForFanctors =
  | TokenType.Minus
  | TokenType.Plus;

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

export type OperatorForUnaries =
  | TokenType.Slash
  | TokenType.Star;

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
export type Unary = UnaryWithOperator | Primary;

export type OperatorForUnary =
  | TokenType.Bang
  | TokenType.Minus;

export class UnaryWithOperator {
  operator: OperatorForUnary;
  right: Unary;

  constructor(operator: OperatorForUnary, right: Unary) {
    this.operator = operator;
    this.right = right;
  }
}

/**
 * Primary
 */
export type Primary = PrimaryValue | Group;

export type PrimaryValueType =
  | TokenType.String
  | TokenType.Number
  | TokenType.True
  | TokenType.False
  | TokenType.Nil;

export class PrimaryValue {
  type: PrimaryValueType;
  value?: string | number | Expression;

  constructor(
    type: PrimaryValueType,
    value?: string | number,
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
