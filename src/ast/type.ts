/**
 * Expression
 */
export type Expression = Equality;

/**
 * Equality
 */
export type Equality = Comparision | EqualityWithComparisionsAndOperator;
export type EqualityWithComparisionsAndOperator = {
  left: Comparision;
  operator: EqualityOperator;
  right: Comparision;
};
export enum EqualityOperator {
  BangEqual = 1,
  EqualEqual,
}

/**
 * Comparision
 */
export type Comparision = Term | ComparisionWithTermsAndOperator;
export type ComparisionWithTermsAndOperator = {
  left: Term;
  operator: ComparisionOperator;
  right: Term;
};
export enum ComparisionOperator {
  Greater = 1,
  GreaterEqual,
  Less,
  LessEqual,
}

/**
 * Term
 */
export type Term = Fanctor | FanctorWithUnariesAndOperator;
export type TermWithFanctorsAndOperator = {
  left: Fanctor;
  operator: TermOperator;
  right: Fanctor;
};
export enum TermOperator {
  Minus = 1,
  Plus,
}

/**
 * Fanctor
 */
export type Fanctor = Unary | FanctorWithUnariesAndOperator;
export type FanctorWithUnariesAndOperator = {
  left: Unary;
  operator: FanctorOperator;
  right: Unary;
};
export enum FanctorOperator {
  Slash = 1,
  Star,
}

/**
 * Unary
 */
export type Unary = UnaryWithOperator | Primary;
export type UnaryWithOperator = {
  operator: UnaryOperator;
  unary: Unary;
};
export enum UnaryOperator {
  Bang = 1,
  Minus,
}

/**
 * Primary
 */
export type Primary = {
  type: PrimaryType;
  value?: string | number | Expression;
};
export enum PrimaryType {
  String = 1,
  Number,
  True,
  False,
  Nil,
  Expression,
}
