/**
 * Expression
 */
export type Expression = Equality;

/**
 * Equality
 */
export type Equality = Comparision | ComparisionsAndOperator;

export enum OperatorForComparisions {
  BangEqual,
  EqualEqual,
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
  Greater,
  GreaterEqual,
  Less,
  LessEqual,
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
  Minus,
  Plus,
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
  Slash,
  Star,
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
export type Unary = UnaryWithOperator | Primary;

export enum OperatorForUnary {
  Bang,
  Minus,
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
 * Primary
 */
export enum PrimaryType {
  String,
  Number,
  True,
  False,
  Nil,
  Group,
}

export class Primary {
  type: PrimaryType;
  value?: string | number | Group;

  constructor(
    type: PrimaryType,
    value?: string | number | Group,
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
