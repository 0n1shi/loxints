import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { LineNumber, Token, TokenType } from "../../token/type.ts";
import { tokenize } from "../../token/func.ts";
import { TooManyArgumentsError } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/_errors.ts";

Deno.test("Testing tokenize()", async (t) => {
  type Test = {
    name: string;
    input: string;
    expected: {
      tokens: Token[];
      lineNumber: LineNumber;
    };
  };
  const tests: Test[] = [
    {
      name: "Single-character symbols",
      input: "{ . -  }",
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.Dot },
          { type: TokenType.Minus },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 1,
      },
    },
    {
      name: "Double-character symbols",
      input: "{ != == <= >= }",
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.BangEqual },
          { type: TokenType.EqualEqual },
          { type: TokenType.LessEqual },
          { type: TokenType.GreaterEqual },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 1,
      },
    },
    {
      name: "New line",
      input: `{
  . -
}`,
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.Dot },
          { type: TokenType.Minus },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 3,
      },
    },
    {
      name: "Comment",
      input: `{
  // comment
}`,
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 3,
      },
    },
    {
      name: "Number",
      input: `{
  123,
  123.5,
}`,
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.Number, value: 123 },
          { type: TokenType.Comma },
          { type: TokenType.Number, value: 123.5 },
          { type: TokenType.Comma },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 4,
      },
    },
    {
      name: "Identifier",
      input: `{
  msg = 123;
}`,
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.Number, value: 123 },
          { type: TokenType.SemiColon },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 3,
      },
    },
    {
      name: "String",
      input: `{
  msg = "Hello world";
}`,
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "Hello world" },
          { type: TokenType.SemiColon },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 3,
      },
    },
    {
      name: "Keywords",
      input: `{
  var msg = "Hello world";
}`,
      expected: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.Var },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "Hello world" },
          { type: TokenType.SemiColon },
          { type: TokenType.BraceRight },
        ],
        lineNumber: 3,
      },
    },
    {
      name: "Print statement",
      input: `print 10 + 5;`,
      expected: {
        tokens: [
          { type: TokenType.Print },
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 5 },
          { type: TokenType.SemiColon },
        ],
        lineNumber: 1,
      },
    },
    {
      name: "statements",
      input: `10 + 5; 1 + 2;`,
      expected: {
        tokens: [
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 5 },
          { type: TokenType.SemiColon },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 2 },
          { type: TokenType.SemiColon },
        ],
        lineNumber: 1,
      },
    },
    {
      name: "variable declaration",
      input: `var msg = "hello world."`,
      expected: {
        tokens: [
          { type: TokenType.Var },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "hello world." },
        ],
        lineNumber: 1,
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [tokens, lineNumber] = tokenize(test.input);
      assertEquals(tokens, test.expected.tokens);
      assertEquals(lineNumber, test.expected.lineNumber);
    });
  }
});
