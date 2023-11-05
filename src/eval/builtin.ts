import { Environment, Value, ValueType } from "./type.ts";
import { writeAllSync } from "https://deno.land/std@0.205.0/streams/write_all.ts";
export const builtinEnvironment = new Environment();

builtinEnvironment.add(
  "div",
  new Value(ValueType.Function, (a: number, b: number) => {
    return a % b;
  }),
);

builtinEnvironment.add(
  "clock",
  new Value(ValueType.Function, (): number => {
    return new Date().valueOf();
  }),
);
