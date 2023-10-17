import { Primary, UnariesAndOperator, UnaryWithOperator } from "../ast/type.ts";

export function isInstanceOfUnary(v: any): boolean {
  return v instanceof UnaryWithOperator || v instanceof Primary;
}

export function isInstanceOfFanctor(v: any): boolean {
  return v instanceof UnariesAndOperator || isInstanceOfUnary(v);
}
