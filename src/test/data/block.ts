import { Token, TokenType } from "../../token/type.ts";
import {
  Block,
  Primary,
  PrimaryType,
  PrintStatement,
  VariableDeclaration,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Block;
};

export const blockTests: TestData[] = [
  {
    name: "define string variable, then print it.",
    program: `{
var msg = "hello world";
print msg;
}`,
    lines: 4,
    tokens: [
      { type: TokenType.BraceLeft },
      { type: TokenType.Var },
      { type: TokenType.Identifier, value: "msg" },
      { type: TokenType.Equal },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
      { type: TokenType.Print },
      { type: TokenType.Identifier, value: "msg" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new Block([
      new VariableDeclaration(
        "msg",
        new Primary(PrimaryType.String, "hello world"),
      ),
      new PrintStatement(new Primary(PrimaryType.Identifier, "msg")),
    ]),
  },
];
