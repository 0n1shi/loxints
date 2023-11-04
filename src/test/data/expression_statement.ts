import { Token, TokenType } from "../../token/type.ts";
import {
  ExpressionStatement,
  FanctorsAndOperator,
  OperatorForFanctors,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
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
  },
];
