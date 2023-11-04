import { Token, TokenType } from "../../token/type.ts";
import { Primary, PrimaryType } from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Primary;
};

export const primaryTests: TestData[] = [
  {
    name: "number",
    program: "10",
    lines: 1,
    tokens: [{ type: TokenType.Number, value: 10 }],
    ast: new Primary(PrimaryType.Number, 10),
  },
  {
    name: "string",
    program: '"hello world"',
    lines: 1,
    tokens: [{ type: TokenType.String, value: "hello world" }],
    ast: new Primary(PrimaryType.String, "hello world"),
  },
  {
    name: "true",
    program: "true",
    lines: 1,
    tokens: [{ type: TokenType.True }],
    ast: new Primary(PrimaryType.True),
  },
  {
    name: "false",
    program: "false",
    lines: 1,
    tokens: [{ type: TokenType.False }],
    ast: new Primary(PrimaryType.False),
  },
  {
    name: "nil",
    program: "nil",
    lines: 1,
    tokens: [{ type: TokenType.Nil }],
    ast: new Primary(PrimaryType.Nil),
  },
  {
    name: "identifier",
    program: "name",
    lines: 1,
    tokens: [{ type: TokenType.Identifier, value: "name" }],
    ast: new Primary(PrimaryType.Identifier, "name"),
  },
];
