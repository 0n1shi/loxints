import { TokenType } from "../../token/type.ts";
import { Primary, PrimaryType, VariableDeclaration } from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
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
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment(),
    environmentAfter: new Environment().add(
      "name",
      new Value(ValueType.Nil, null),
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
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment(),
    environmentAfter: new Environment().add(
      "name",
      new Value(ValueType.String, "mike"),
    ),
  },
];
