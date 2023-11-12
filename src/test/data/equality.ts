import { TokenType } from "../../token/type.ts";
import {
  ComparisionsAndOperator,
  Equality,
  OperatorForComparisions,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
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
    value: new Value(ValueType.Boolean, false),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
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
    value: new Value(ValueType.Boolean, true),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
