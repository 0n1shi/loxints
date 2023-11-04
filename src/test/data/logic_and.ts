import { Token, TokenType } from "../../token/type.ts";
import {
  ComparisionsAndOperator,
  EqualitiesWithAnd,
  LogicAnd,
  OperatorForComparisions,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: LogicAnd;
};

export const logicAndTests: TestData[] = [
  {
    name: "true and false",
    program: "true and false",
    lines: 1,
    tokens: [
      { type: TokenType.True },
      { type: TokenType.And },
      { type: TokenType.False },
    ],
    ast: new EqualitiesWithAnd(
      new Primary(PrimaryType.True),
      new Primary(PrimaryType.False),
    ),
  },
  {
    name: "1 == 1 and 1 == 2",
    program: "1 == 1 and 1 == 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.EqualEqual },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.And },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.EqualEqual },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new EqualitiesWithAnd(
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
