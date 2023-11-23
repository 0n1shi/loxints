import { TokenType } from "../../token/type.ts";
import {
  ExpressionStatement,
  FanctorsAndOperator,
  OperatorForFanctors,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: ExpressionStatement;
};

export const expressionStatementTests: TestData[] = [
  {
    name: "1 + 1;",
    program: `1 + 1;`,
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Plus },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.SemiColon },
    ],
    ast: new ExpressionStatement(
      new FanctorsAndOperator(
        new Primary(PrimaryType.Number, 1),
        OperatorForFanctors.Plus,
        new Primary(PrimaryType.Number, 1),
      ),
    ),
    value: new Value(ValueType.Number, 2),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
