import { Expression } from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";

type TestData = TestDataBase & {
  ast: Expression;
};

export const expressionTests: TestData[] = [];
