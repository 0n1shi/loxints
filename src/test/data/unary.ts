import { TokenType } from "../../token/type.ts";
import {
  OperatorForUnary,
  Primary,
  PrimaryType,
  Unary,
  UnaryWithOperator,
} from "../../ast/type.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";
import { TestDataBase } from "./data.ts";

type TestData = TestDataBase & {
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
    value: new Value(ValueType.Number, -10),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
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
    value: new Value(ValueType.Number, 10),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
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
    value: new Value(ValueType.Boolean, false),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
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
    value: new Value(ValueType.Boolean, false),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
