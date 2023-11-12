import { TokenType } from "../../token/type.ts";
import {
  ComparisionsAndOperator,
  EqualitiesWithAnd,
  LogicAnd,
  OperatorForComparisions,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
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
    value: new Value(ValueType.Boolean, false),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
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
    value: new Value(ValueType.Boolean, false),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
