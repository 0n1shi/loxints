import { TokenType } from "../../token/type.ts";
import { TestDataBase } from "./data.ts";
import { Primary, PrimaryType, PrintStatement } from "../../ast/type.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: PrintStatement;
};

export const printStatementTests: TestData[] = [
  {
    name: 'print "hello world".',
    program: `print "hello world";`,
    lines: 1,
    tokens: [
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
    ],
    ast: new PrintStatement(
      new Primary(PrimaryType.String, "hello world"),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
