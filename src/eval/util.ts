import {
  FanctorsAndOperator,
  Primary,
  PrimaryWithArgumentsOrGetters,
  TermsAndOperator,
  UnariesAndOperator,
  UnaryWithOperator,
} from "../ast/type.ts";

export function isInstanceOfCall(v: any): boolean {
  return v instanceof Primary || v instanceof PrimaryWithArgumentsOrGetters;
}

export function isInstanceOfUnary(v: any): boolean {
  return v instanceof UnaryWithOperator || isInstanceOfCall(v);
}

export function isInstanceOfFanctor(v: any): boolean {
  return v instanceof UnariesAndOperator || isInstanceOfUnary(v);
}

export function isInstanceOfTerm(v: any): boolean {
  return v instanceof FanctorsAndOperator || isInstanceOfFanctor(v);
}

export function isInstanceOfComparision(v: any): boolean {
  return v instanceof TermsAndOperator || isInstanceOfTerm(v);
}
