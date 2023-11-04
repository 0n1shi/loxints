import { Token, TokenType } from "../../token/type.ts";
import { Primary, PrimaryType, PrintStatement } from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: PrintStatement;
};

export const printStatementTests: TestData[] = [
  {
    name: 'print "hello world".',
    program: `print "hello world";`,
    lines: 1,
    tokens: [
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
    ],
    ast: new PrintStatement(
      new Primary(PrimaryType.String, "hello world"),
    ),
  },
];
