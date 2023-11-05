import { Token, TokenType } from "../../token/type.ts";
import { Arguments, Primary, PrimaryType } from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Arguments;
};

export const argumentsTests: TestData[] = [
  {
    name: "empty arguments",
    program: `()`,
    lines: 1,
    tokens: [
      { type: TokenType.ParenLeft },
      { type: TokenType.ParenRight },
    ],
    ast: new Arguments([]),
  },
  {
    name: "1 arguments",
    program: `(1)`,
    lines: 1,
    tokens: [
      { type: TokenType.ParenLeft },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.ParenRight },
    ],
    ast: new Arguments([
      new Primary(PrimaryType.Number, 1),
    ]),
  },
  {
    name: "2 arguments with comma",
    program: `(1, 2)`,
    lines: 1,
    tokens: [
      { type: TokenType.ParenLeft },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 2 },
      { type: TokenType.ParenRight },
    ],
    ast: new Arguments([
      new Primary(PrimaryType.Number, 1),
      new Primary(PrimaryType.Number, 2),
    ]),
  },
];
