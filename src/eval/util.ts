import { Primary, UnaryWithOperator } from "../ast/type.ts";
export function isInstanceOfUnary(v: any): boolean {
  return v instanceof UnaryWithOperator || v instanceof Primary;
}
