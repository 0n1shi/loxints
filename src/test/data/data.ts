import { Token } from "../../token/type.ts";
import { Environment, Value } from "../../eval/type.ts";

export type TestDataBase = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  value: Value;
  environmentBefore: Environment;
  environmentAfter: Environment;
};
