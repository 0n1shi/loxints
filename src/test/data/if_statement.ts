import { Token, TokenType } from "../../token/type.ts";
import {
  AssignmentWithIdentifier,
  Block,
  ExpressionStatement,
  IfStatement,
  Primary,
  PrimaryType,
  PrintStatement,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: IfStatement;
};

export const ifStatementTests: TestData[] = [
  {
    name: "if (true) a = 10",
    program: `if (true) a = 10;
else a = 20;`,
    lines: 2,
    tokens: [
      { type: TokenType.If },
      { type: TokenType.ParenLeft },
      { type: TokenType.True },
      { type: TokenType.ParenRight },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 10 },
      { type: TokenType.SemiColon },
      { type: TokenType.Else },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 20 },
      { type: TokenType.SemiColon },
    ],
    ast: new IfStatement(
      new Primary(PrimaryType.True),
      new ExpressionStatement(
        new AssignmentWithIdentifier("a", new Primary(PrimaryType.Number, 10)),
      ),
      new ExpressionStatement(
        new AssignmentWithIdentifier("a", new Primary(PrimaryType.Number, 20)),
      ),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment()
      .add("a", new Value(ValueType.Number, 0)),
    environmentAfter: new Environment()
      .add("a", new Value(ValueType.Number, 10)),
  },
  {
    name: "if (false) a = 10",
    program: `if (false) a = 10;
else a = 20;`,
    lines: 2,
    tokens: [
      { type: TokenType.If },
      { type: TokenType.ParenLeft },
      { type: TokenType.False },
      { type: TokenType.ParenRight },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 10 },
      { type: TokenType.SemiColon },
      { type: TokenType.Else },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 20 },
      { type: TokenType.SemiColon },
    ],
    ast: new IfStatement(
      new Primary(PrimaryType.False),
      new ExpressionStatement(
        new AssignmentWithIdentifier("a", new Primary(PrimaryType.Number, 10)),
      ),
      new ExpressionStatement(
        new AssignmentWithIdentifier("a", new Primary(PrimaryType.Number, 20)),
      ),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment()
      .add("a", new Value(ValueType.Number, 0)),
    environmentAfter: new Environment()
      .add("a", new Value(ValueType.Number, 20)),
  },
  {
    name: "assignment in if true-block.",
    program: `if (true) {
  a = 10;
} else {
  a = 20;
}`,
    lines: 5,
    tokens: [
      { type: TokenType.If },
      { type: TokenType.ParenLeft },
      { type: TokenType.True },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 10 },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
      { type: TokenType.Else },
      { type: TokenType.BraceLeft },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 20 },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new IfStatement(
      new Primary(PrimaryType.True),
      new Block([
        new ExpressionStatement(
          new AssignmentWithIdentifier(
            "a",
            new Primary(PrimaryType.Number, 10),
          ),
        ),
      ]),
      new Block([
        new ExpressionStatement(
          new AssignmentWithIdentifier(
            "a",
            new Primary(PrimaryType.Number, 20),
          ),
        ),
      ]),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment()
      .add("a", new Value(ValueType.Number, 0)),
    environmentAfter: new Environment()
      .add("a", new Value(ValueType.Number, 10)),
  },
  {
    name: "assignment in if false-block.",
    program: `if (false) {
  a = 10;
} else {
  a = 20;
}`,
    lines: 5,
    tokens: [
      { type: TokenType.If },
      { type: TokenType.ParenLeft },
      { type: TokenType.False },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 10 },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
      { type: TokenType.Else },
      { type: TokenType.BraceLeft },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 20 },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new IfStatement(
      new Primary(PrimaryType.False),
      new Block([
        new ExpressionStatement(
          new AssignmentWithIdentifier(
            "a",
            new Primary(PrimaryType.Number, 10),
          ),
        ),
      ]),
      new Block([
        new ExpressionStatement(
          new AssignmentWithIdentifier(
            "a",
            new Primary(PrimaryType.Number, 20),
          ),
        ),
      ]),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment()
      .add("a", new Value(ValueType.Number, 0)),
    environmentAfter: new Environment()
      .add("a", new Value(ValueType.Number, 20)),
  },
];
