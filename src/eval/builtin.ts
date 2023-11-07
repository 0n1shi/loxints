import { Environment, Value, ValueType } from "./type.ts";
export const builtinEnvironment = new Environment();

builtinEnvironment.add(
  "mod",
  new Value(ValueType.NativeFunction, (a: number, b: number) => {
    return a % b;
  }),
);

builtinEnvironment.add(
  "clock",
  new Value(ValueType.NativeFunction, (): number => {
    return new Date().valueOf();
  }),
);
