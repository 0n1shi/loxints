import { Token, TokenType } from "../../token/type.ts";
import {
  FanctorsAndOperator,
  OperatorForFanctors,
  Primary,
  PrimaryType,
  Term,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Term;
};

export const termTests: TestData[] = [
  {
    name: "10 + 10",
    program: "10 + 10",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 10 },
      { type: TokenType.Plus },
      { type: TokenType.Number, value: 10 },
    ],
    ast: new FanctorsAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForFanctors.Plus,
      new Primary(PrimaryType.Number, 10),
    ),
  },
  {
    name: "10 - 10",
    program: "10 - 10",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 10 },
      { type: TokenType.Minus },
      { type: TokenType.Number, value: 10 },
    ],
    ast: new FanctorsAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForFanctors.Minus,
      new Primary(PrimaryType.Number, 10),
    ),
  },
];
