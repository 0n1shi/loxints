import { TokenType } from "../../token/type.ts";
import {
  FanctorsAndOperator,
  Group,
  OperatorForFanctors,
  OperatorForTerms,
  Primary,
  PrimaryType,
  TermsAndOperator,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: Primary;
};

export const primaryTests: TestData[] = [
  {
    name: "number",
    program: "10",
    lines: 1,
    tokens: [{ type: TokenType.Number, value: 10 }],
    ast: new Primary(PrimaryType.Number, 10),
    value: new Value(ValueType.Number, 10),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
  {
    name: "string",
    program: '"hello world"',
    lines: 1,
    tokens: [{ type: TokenType.String, value: "hello world" }],
    ast: new Primary(PrimaryType.String, "hello world"),
    value: new Value(ValueType.String, "hello world"),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
  {
    name: "true",
    program: "true",
    lines: 1,
    tokens: [{ type: TokenType.True }],
    ast: new Primary(PrimaryType.True),
    value: new Value(ValueType.Boolean, true),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
  {
    name: "false",
    program: "false",
    lines: 1,
    tokens: [{ type: TokenType.False }],
    ast: new Primary(PrimaryType.False),
    value: new Value(ValueType.Boolean, false),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
  {
    name: "nil",
    program: "nil",
    lines: 1,
    tokens: [{ type: TokenType.Nil }],
    ast: new Primary(PrimaryType.Nil),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
  {
    name: "identifier",
    program: "name",
    lines: 1,
    tokens: [{ type: TokenType.Identifier, value: "name" }],
    ast: new Primary(PrimaryType.Identifier, "name"),
    value: new Value(ValueType.String, "mike"),
    environmentBefore: new Environment().add(
      "name",
      new Value(ValueType.String, "mike"),
    ),
    environmentAfter: new Environment().add(
      "name",
      new Value(ValueType.String, "mike"),
    ),
  },
  {
    name: "group",
    program: "(1 + 2)",
    lines: 1,
    tokens: [
      { type: TokenType.ParenLeft },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Plus },
      { type: TokenType.Number, value: 2 },
      { type: TokenType.ParenRight },
    ],
    ast: new Primary(
      PrimaryType.Group,
      new Group(
        new FanctorsAndOperator(
          new Primary(PrimaryType.Number, 1),
          OperatorForFanctors.Plus,
          new Primary(PrimaryType.Number, 2),
        ),
      ),
    ),
    value: new Value(ValueType.Number, 3),
    environmentBefore: new Environment(),
    environmentAfter: new Environment(),
  },
];
