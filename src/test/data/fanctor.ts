import { Token, TokenType } from "../../token/type.ts";
import {
  Fanctor,
  OperatorForUnaries,
  OperatorForUnary,
  Primary,
  PrimaryType,
  UnariesAndOperator,
  UnaryWithOperator,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Fanctor;
};

export const fanctorTests: TestData[] = [
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
    name: "10 / 2",
    program: "10 / 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 10 },
      { type: TokenType.Slash },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new UnariesAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForUnaries.Slash,
      new Primary(PrimaryType.Number, 2),
    ),
  },
  {
    name: "-10 * 2",
    program: "-10 * 2",
    lines: 1,
    tokens: [
      { type: TokenType.Minus },
      { type: TokenType.Number, value: 10 },
      { type: TokenType.Star },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new UnariesAndOperator(
      new UnaryWithOperator(
        OperatorForUnary.Minus,
        new Primary(PrimaryType.Number, 10),
      ),
      OperatorForUnaries.Star,
      new Primary(PrimaryType.Number, 2),
    ),
  },
];
