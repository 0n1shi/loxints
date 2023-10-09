/**
 * Equality
 */
export type Equality = Comparision | {
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
export type Comparision = Term | {
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
export type Term = Fanctor | {
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
export type Fanctor = Unary | {
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
export type Unary = {
  operator: UnaryOperator;
  unary: Unary;
} | Primary;
export enum UnaryOperator {
  Bang = 1,
  Minus,
}

/**
 * Primary
 */
export type Primary = PrimaryType;
export enum PrimaryType {
  String = 1,
  Number,
  True,
  False,
  Nil,
}
