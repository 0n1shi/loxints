import { Token, TokenType } from "../../token/type.ts";
import {
  Arguments,
  Block,
  Call,
  Primary,
  PrimaryType,
  PrimaryWithArguments,
  ReturnStatement,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment } from "../../eval/type.ts";
import { UserFunction } from "../../eval/type.ts";
import { Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: Call;
};

export const callTests: TestData[] = [
  {
    name: "caller",
    program: `hello`,
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "hello" },
    ],
    ast: new Primary(PrimaryType.Identifier, "hello"),
    value: new Value(
      ValueType.UserFunction,
      new UserFunction(
        [],
        new Block([
          new ReturnStatement(new Primary(PrimaryType.String, "hello")),
        ]),
      ),
    ),
    environmentBefore: new Environment().add(
      "hello",
      new Value(
        ValueType.UserFunction,
        new UserFunction(
          [],
          new Block([
            new ReturnStatement(new Primary(PrimaryType.String, "hello")),
          ]),
        ),
      ),
    ),
    environmentAfter: new Environment().add(
      "hello",
      new Value(
        ValueType.UserFunction,
        new UserFunction(
          [],
          new Block([
            new ReturnStatement(new Primary(PrimaryType.String, "hello")),
          ]),
        ),
      ),
    ),
  },
  {
    name: "call without any arguments",
    program: `hello()`,
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "hello" },
      { type: TokenType.ParenLeft },
      { type: TokenType.ParenRight },
    ],
    ast: new PrimaryWithArguments(
      new Primary(PrimaryType.Identifier, "hello"),
      [new Arguments([])],
    ),
    value: new Value(ValueType.String, "hello"),
    environmentBefore: new Environment().add(
      "hello",
      new Value(
        ValueType.UserFunction,
        new UserFunction(
          [],
          new Block([
            new ReturnStatement(new Primary(PrimaryType.String, "hello")),
          ]),
        ),
      ),
    ),
    environmentAfter: new Environment().add(
      "hello",
      new Value(
        ValueType.UserFunction,
        new UserFunction(
          [],
          new Block([
            new ReturnStatement(new Primary(PrimaryType.String, "hello")),
          ]),
        ),
      ),
    ),
  },
  // {
  //   name: "call without any arguments",
  //   program: `hello()`,
  //   lines: 1,
  //   tokens: [
  //     { type: TokenType.Identifier, value: "hello" },
  //     { type: TokenType.ParenLeft },
  // },
  // {
  //   name: "return function and call it",
  //   program: `hello()()`,
  //   lines: 1,
  //   tokens: [
  //     { type: TokenType.Identifier, value: "hello" },
  //     { type: TokenType.ParenLeft },
  //     { type: TokenType.ParenRight },
  //     { type: TokenType.ParenLeft },
  //     { type: TokenType.ParenRight },
  //   ],
  //   ast: new PrimaryWithArguments(
  //     new Primary(PrimaryType.Identifier, "hello"),
  //     [new Arguments([]), new Arguments([])],
  //   ),
  // },
  // {
  //   name: "call with 2 arguments",
  //   program: `add(1, 2)`,
  //   lines: 1,
  //   tokens: [
  //     { type: TokenType.Identifier, value: "add" },
  //     { type: TokenType.ParenLeft },
  //     { type: TokenType.Number, value: 1 },
  //     { type: TokenType.Comma },
  //     { type: TokenType.Number, value: 2 },
  //     { type: TokenType.ParenRight },
  //   ],
  //   ast: new PrimaryWithArguments(
  //     new Primary(PrimaryType.Identifier, "add"),
  //     [
  //       new Arguments([
  //         new Primary(PrimaryType.Number, 1),
  //         new Primary(PrimaryType.Number, 2),
  //       ]),
  //     ],
  //   ),
  // },
  // {
  //   name: "curried function",
  //   program: `add(1)(2)`,
  //   lines: 1,
  //   tokens: [
  //     { type: TokenType.Identifier, value: "add" },
  //     { type: TokenType.ParenLeft },
  //     { type: TokenType.Number, value: 1 },
  //     { type: TokenType.ParenRight },
  //     { type: TokenType.ParenLeft },
  //     { type: TokenType.Number, value: 2 },
  //     { type: TokenType.ParenRight },
  //   ],
  //   ast: new PrimaryWithArguments(
  //     new Primary(PrimaryType.Identifier, "add"),
  //     [
  //       new Arguments([
  //         new Primary(PrimaryType.Number, 1),
  //       ]),
  //       new Arguments([
  //         new Primary(PrimaryType.Number, 2),
  //       ]),
  //     ],
  //   ),
  // },
  // {
  //   name: "curried function 2",
  //   program: `add(1, 2)(1, 2)`,
  //   lines: 1,
  //   tokens: [
  //     { type: TokenType.Identifier, value: "add" },
  //     { type: TokenType.ParenLeft },
  //     { type: TokenType.Number, value: 1 },
  //     { type: TokenType.Comma },
  //     { type: TokenType.Number, value: 2 },
  //     { type: TokenType.ParenRight },
  //     { type: TokenType.ParenLeft },
  //     { type: TokenType.Number, value: 1 },
  //     { type: TokenType.Comma },
  //     { type: TokenType.Number, value: 2 },
  //     { type: TokenType.ParenRight },
  //   ],
  //   ast: new PrimaryWithArguments(
  //     new Primary(PrimaryType.Identifier, "add"),
  //     [
  //       new Arguments([
  //         new Primary(PrimaryType.Number, 1),
  //         new Primary(PrimaryType.Number, 2),
  //       ]),
  //       new Arguments([
  //         new Primary(PrimaryType.Number, 1),
  //         new Primary(PrimaryType.Number, 2),
  //       ]),
  //     ],
  //   ),
  // },
];
