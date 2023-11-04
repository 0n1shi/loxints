import { Token, TokenType } from "../../token/type.ts";
import {
  OperatorForUnary,
  Primary,
  PrimaryType,
  Unary,
  UnaryWithOperator,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Unary;
};

export const unaryTests: TestData[] = [
  {
    name: "-10",
    program: "-10",
    lines: 1,
    tokens: [
      { type: TokenType.Minus },
      { type: TokenType.Number, value: 10 },
    ],
    ast: new UnaryWithOperator(
      OperatorForUnary.Minus,
      new Primary(PrimaryType.Number, 10),
    ),
  },
  {
    name: "--10",
    program: "--10",
    lines: 1,
    tokens: [
      { type: TokenType.Minus },
      { type: TokenType.Minus },
      { type: TokenType.Number, value: 10 },
    ],
    ast: new UnaryWithOperator(
      OperatorForUnary.Minus,
      new UnaryWithOperator(
        OperatorForUnary.Minus,
        new Primary(PrimaryType.Number, 10),
      ),
    ),
  },
  {
    name: "!true",
    program: "!true",
    lines: 1,
    tokens: [
      { type: TokenType.Bang },
      { type: TokenType.True },
    ],
    ast: new UnaryWithOperator(
      OperatorForUnary.Bang,
      new Primary(PrimaryType.True),
    ),
  },
  {
    name: "!!false",
    program: "!!false",
    lines: 1,
    tokens: [
      { type: TokenType.Bang },
      { type: TokenType.Bang },
      { type: TokenType.False },
    ],
    ast: new UnaryWithOperator(
      OperatorForUnary.Bang,
      new UnaryWithOperator(
        OperatorForUnary.Bang,
        new Primary(PrimaryType.False),
      ),
    ),
  },
];
