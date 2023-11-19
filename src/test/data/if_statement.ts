import { Token, TokenType } from "../../token/type.ts";
import {
  Block,
  IfStatement,
  Primary,
  PrimaryType,
  PrintStatement,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: IfStatement;
};

export const ifStatementTests: TestData[] = [
  {
    name: 'print "hello world" in if.',
    program: `if (true) print "hello world";`,
    lines: 1,
    tokens: [
      { type: TokenType.If },
      { type: TokenType.ParenLeft },
      { type: TokenType.True },
      { type: TokenType.ParenRight },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
    ],
    ast: new IfStatement(
      new Primary(PrimaryType.True),
      new PrintStatement(new Primary(PrimaryType.String, "hello world")),
    ),
  },
  {
    name: 'print "hello world" in if block.',
    program: `if (false) {
  print "hello world";
} else {
  print "hello world in else";
}`,
    lines: 5,
    tokens: [
      { type: TokenType.If },
      { type: TokenType.ParenLeft },
      { type: TokenType.False },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
      { type: TokenType.Else },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world in else" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new IfStatement(
      new Primary(PrimaryType.False),
      new Block([
        new PrintStatement(new Primary(PrimaryType.String, "hello world")),
      ]),
      new Block([
        new PrintStatement(
          new Primary(PrimaryType.String, "hello world in else"),
        ),
      ]),
    ),
  },
];
