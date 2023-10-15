import { Unary, Primary } from "../ast/type.ts";
import { EvaluatedValue } from "./type.ts";

export function evaluateUnary(unary: Unary): EvaluatedValue {
  if (typeof unary == Primary)
}
