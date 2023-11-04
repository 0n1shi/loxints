import { Token, TokenType } from "../../token/type.ts";
import {
  ComparisionsAndOperator,
  Equality,
  OperatorForComparisions,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Equality;
};

export const equalityTests: TestData[] = [
  {
    name: "1 == 2",
    program: "1 == 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.EqualEqual },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new ComparisionsAndOperator(
      new Primary(PrimaryType.Number, 1),
      OperatorForComparisions.EqualEqual,
      new Primary(PrimaryType.Number, 2),
    ),
  },
  {
    name: "1 != 2",
    program: "1 != 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.BangEqual },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new ComparisionsAndOperator(
      new Primary(PrimaryType.Number, 1),
      OperatorForComparisions.BangEqual,
      new Primary(PrimaryType.Number, 2),
    ),
  },
];
