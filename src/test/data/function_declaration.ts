import { Token, TokenType } from "../../token/type.ts";
import {
  Block,
  FanctorsAndOperator,
  FunctionDeclaration,
  OperatorForFanctors,
  Primary,
  PrimaryType,
  PrintStatement,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: FunctionDeclaration;
};

export const functionDeclarationTests: TestData[] = [
  {
    name: "hello()",
    program: `fun hello() {
  print "hello world";
}`,
    lines: 3,
    tokens: [
      { type: TokenType.Fun },
      { type: TokenType.Identifier, value: "hello" },
      { type: TokenType.ParenLeft },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new FunctionDeclaration(
      "hello",
      [],
      new Block([
        new PrintStatement(new Primary(PrimaryType.String, "hello world")),
      ]),
    ),
  },
  {
    name: "greet to a name",
    program: `fun greet(name) {
  print "hello, " + name;
}`,
    lines: 3,
    tokens: [
      { type: TokenType.Fun },
      { type: TokenType.Identifier, value: "greet" },
      { type: TokenType.ParenLeft },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello, " },
      { type: TokenType.Plus },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new FunctionDeclaration(
      "greet",
      ["name"],
      new Block([
        new PrintStatement(
          new FanctorsAndOperator(
            new Primary(PrimaryType.String, "hello, "),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Identifier, "name"),
          ),
        ),
      ]),
    ),
  },
];
