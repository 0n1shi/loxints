import { Token, TokenType } from "../../token/type.ts";
import { Primary, PrimaryType, VariableDeclaration } from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: VariableDeclaration;
};

export const variableDeclarationTests: TestData[] = [
  {
    name: "var name;",
    program: `var name;`,
    lines: 1,
    tokens: [
      { type: TokenType.Var },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.SemiColon },
    ],
    ast: new VariableDeclaration(
      "name",
    ),
  },
  {
    name: 'var name = "mike";',
    program: `var name = "mike";`,
    lines: 1,
    tokens: [
      { type: TokenType.Var },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.Equal },
      { type: TokenType.String, value: "mike" },
      { type: TokenType.SemiColon },
    ],
    ast: new VariableDeclaration(
      "name",
      new Primary(PrimaryType.String, "mike"),
    ),
  },
];
