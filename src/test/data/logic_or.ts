import { TokenType } from "../../token/type.ts";
import {
  ComparisionsAndOperator,
  LogicAndsWithOr,
  LogicOr,
  OperatorForComparisions,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
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
    value: new Value(ValueType.Boolean, true),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
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
    value: new Value(ValueType.Boolean, true),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
