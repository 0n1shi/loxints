import { TokenType } from "../../token/type.ts";
import {
  FanctorsAndOperator,
  OperatorForFanctors,
  Primary,
  PrimaryType,
  Term,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
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
    value: new Value(ValueType.Number, 20),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
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
    value: new Value(ValueType.Number, 0),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
