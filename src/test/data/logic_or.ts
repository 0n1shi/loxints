import { Token, TokenType } from "../../token/type.ts";
import {
  ComparisionsAndOperator,
  LogicAndsWithOr,
  LogicOr,
  OperatorForComparisions,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: LogicOr;
};

export const logicOrTests: TestData[] = [
  {
    name: "true or false",
    program: "true or false",
    lines: 1,
    tokens: [
      { type: TokenType.True },
      { type: TokenType.Or },
      { type: TokenType.False },
    ],
    ast: new LogicAndsWithOr(
      new Primary(PrimaryType.True),
      new Primary(PrimaryType.False),
    ),
  },
  {
    name: "1 == 1 or 1 == 2",
    program: "1 == 1 or 1 == 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.EqualEqual },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Or },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.EqualEqual },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new LogicAndsWithOr(
      new ComparisionsAndOperator(
        new Primary(PrimaryType.Number, 1),
        OperatorForComparisions.EqualEqual,
        new Primary(PrimaryType.Number, 1),
      ),
      new ComparisionsAndOperator(
        new Primary(PrimaryType.Number, 1),
        OperatorForComparisions.EqualEqual,
        new Primary(PrimaryType.Number, 2),
      ),
    ),
  },
];
