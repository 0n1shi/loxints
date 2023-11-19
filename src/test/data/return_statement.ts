import { TokenType } from "../../token/type.ts";
import { Primary, PrimaryType, ReturnStatement } from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";
import { ReturnValueError } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: ReturnStatement;
  error: Error;
};

export const returnStatementTests: TestData[] = [
  {
    name: "return;",
    program: `return;`,
    lines: 1,
    tokens: [
      { type: TokenType.Return },
      { type: TokenType.SemiColon },
    ],
    ast: new ReturnStatement(),
    value: new Value(ValueType.Nil, null),
    error: new ReturnValueError(new Value(ValueType.Nil, null)),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
  {
    name: "return 10;",
    program: `return 10;`,
    lines: 1,
    tokens: [
      { type: TokenType.Return },
      { type: TokenType.Number, value: 10 },
      { type: TokenType.SemiColon },
    ],
    ast: new ReturnStatement(new Primary(PrimaryType.Number, 10)),
    value: new Value(ValueType.Nil, null),
    error: new ReturnValueError(new Value(ValueType.Number, 10)),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
