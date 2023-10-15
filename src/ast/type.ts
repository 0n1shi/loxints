import { Symbol } from "../token/type.ts";
/**
 * Expression
 */
export type Expression = Equality;

/**
 * Equality
 */
export type Equality = Comparision | ComparisionsAndOperator;
export type ComparisionsAndOperator = {
  left: Comparision;
  operator: Symbol.BangEqual | Symbol.EqualEqual;
  right: Comparision;
};

/**
 * Comparision
 */
export type Comparision = Term | TermsAndOperator;
export type TermsAndOperator = {
  left: Term;
  operator:
    | Symbol.Greater
    | Symbol.GreaterEqual
    | Symbol.Less
    | Symbol.LessEqual;
  right: Term;
};

/**
 * Term
 */
export type Term = Fanctor | FanctorsAndOperator;
export type FanctorsAndOperator = {
  left: Fanctor;
  operator: Symbol.Minus | Symbol.Plus;
  right: Fanctor;
};

/**
 * Fanctor
 */
export type Fanctor = Unary | UnariesAndOperator;
export type UnariesAndOperator = {
  left: Unary;
  operator: Symbol.Slash | Symbol.Star;
  right: Unary;
};

/**
 * Unary
 */
export type Unary = UnaryWithOperator | Primary;
export type UnaryWithOperator = {
  operator: Symbol.Bang | Symbol.Minus;
  right: Unary;
};

/**
 * Primary
 */
export type Primary = PrimaryValue | Group;
export type PrimaryValue = {
  type:
    | Symbol.String
    | Symbol.Number
    | Symbol.True
    | Symbol.False
    | Symbol.Nil;
  value?: string | number;
};
export type Group = {
  left: Symbol.ParenLeft;
  middle: Expression;
  right: Symbol.ParenRight;
};
