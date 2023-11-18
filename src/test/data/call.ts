import { TokenType } from "../../token/type.ts";
import {
  Arguments,
  Block,
  Call,
  FanctorsAndOperator,
  Getter,
  OperatorForFanctors,
  Primary,
  PrimaryType,
  PrimaryWithArgumentsOrGetters,
  PrintStatement,
  ReturnStatement,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment } from "../../eval/type.ts";
import { UserFunction } from "../../eval/type.ts";
import { Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: Call;
};

const userFunctionHello = new UserFunction(
  [],
  new Block([new PrintStatement(new Primary(PrimaryType.String, "hello"))]),
  new Environment(),
);
const userFunctionAdd = new UserFunction(
  ["a", "b"],
  new Block([
    new ReturnStatement(
      new FanctorsAndOperator(
        new Primary(PrimaryType.Identifier, "a"),
        OperatorForFanctors.Plus,
        new Primary(PrimaryType.Identifier, "b"),
      ),
    ),
  ]),
  new Environment(),
);

const testEnv = new Environment().add(
  "hello",
  new Value(ValueType.UserFunction, userFunctionHello),
).add(
  "add",
  new Value(ValueType.UserFunction, userFunctionAdd),
);

export const callTests: TestData[] = [
  {
    name: "call without any arguments",
    program: `hello()`,
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "hello" },
      { type: TokenType.ParenLeft },
      { type: TokenType.ParenRight },
    ],
    ast: new PrimaryWithArgumentsOrGetters(
      new Primary(PrimaryType.Identifier, "hello"),
      [new Arguments([])],
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: testEnv,
    environmentAfter: testEnv,
  },
  {
    name: "call with 2 arguments",
    program: `add(1, 2)`,
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "add" },
      { type: TokenType.ParenLeft },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 2 },
      { type: TokenType.ParenRight },
    ],
    ast: new PrimaryWithArgumentsOrGetters(
      new Primary(PrimaryType.Identifier, "add"),
      [
        new Arguments([
          new Primary(PrimaryType.Number, 1),
          new Primary(PrimaryType.Number, 2),
        ]),
      ],
    ),
    value: new Value(ValueType.Number, 3),
    environmentBefore: testEnv,
    environmentAfter: testEnv,
  },
  {
    name: "property access",
    program: `user.id`,
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "user" },
      { type: TokenType.Dot },
      { type: TokenType.Identifier, value: "id" },
    ],
    ast: new PrimaryWithArgumentsOrGetters(
      new Primary(PrimaryType.Identifier, "user"),
      [
        new Getter("id"),
      ],
    ),
    value: new Value(ValueType.Number, 3),
    environmentBefore: testEnv,
    environmentAfter: testEnv,
  },
  {
    name: "call class method",
    program: `user.id()`,
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "user" },
      { type: TokenType.Dot },
      { type: TokenType.Identifier, value: "id" },
      { type: TokenType.ParenLeft },
      { type: TokenType.ParenRight },
    ],
    ast: new PrimaryWithArgumentsOrGetters(
      new Primary(PrimaryType.Identifier, "user"),
      [
        new Getter("id"),
        new Arguments([]),
      ],
    ),
    value: new Value(ValueType.Number, 3),
    environmentBefore: testEnv,
    environmentAfter: testEnv,
  },
  {
    name: "method chain",
    program: `egg.scramble(3).with(cheddar)`,
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "egg" },
      { type: TokenType.Dot },
      { type: TokenType.Identifier, value: "scramble" },
      { type: TokenType.ParenLeft },
      { type: TokenType.Number, value: 3 },
      { type: TokenType.ParenRight },
      { type: TokenType.Dot },
      { type: TokenType.Identifier, value: "with" },
      { type: TokenType.ParenLeft },
      { type: TokenType.Identifier, value: "cheddar" },
      { type: TokenType.ParenRight },
    ],
    ast: new PrimaryWithArgumentsOrGetters(
      new Primary(PrimaryType.Identifier, "egg"),
      [
        new Getter("scramble"),
        new Arguments([new Primary(PrimaryType.Number, 3)]),
        new Getter("with"),
        new Arguments([new Primary(PrimaryType.Identifier, "cheddar")]),
      ],
    ),
    value: new Value(ValueType.Number, 3),
    environmentBefore: testEnv,
    environmentAfter: testEnv,
  },
];
