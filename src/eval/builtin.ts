import { Environment, Value, ValueType } from "./type.ts";

export const builtinEnvironment = new Environment();

builtinEnvironment.add(
  "div",
  new Value(ValueType.Function, (a: number, b: number) => {
    return a % b;
  }),
);
