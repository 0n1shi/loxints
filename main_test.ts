import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { LineNumber, Symbol, Token } from "./src/token/type.ts";
import { tokenize } from "./src/token/func.ts";

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
          { symbol: Symbol.BraceLeft },
          { symbol: Symbol.Dot },
          { symbol: Symbol.Minus },
          { symbol: Symbol.BraceRight },
        ],
        lineNumber: 1,
      },
    },
    {
      name: "Double-character symbols",
      input: "{ != == <= >= }",
      expected: {
        tokens: [
          { symbol: Symbol.BraceLeft },
          { symbol: Symbol.BangEqual },
          { symbol: Symbol.EqualEqual },
          { symbol: Symbol.LessEqual },
          { symbol: Symbol.GreaterEqual },
          { symbol: Symbol.BraceRight },
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
          { symbol: Symbol.BraceLeft },
          { symbol: Symbol.Dot },
          { symbol: Symbol.Minus },
          { symbol: Symbol.BraceRight },
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
          { symbol: Symbol.BraceLeft },
          { symbol: Symbol.BraceRight },
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
          { symbol: Symbol.BraceLeft },
          { symbol: Symbol.Number, value: 123 },
          { symbol: Symbol.Comma },
          { symbol: Symbol.Number, value: 123.5 },
          { symbol: Symbol.Comma },
          { symbol: Symbol.BraceRight },
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
          { symbol: Symbol.BraceLeft },
          { symbol: Symbol.Identifier, value: "msg" },
          { symbol: Symbol.Equal },
          { symbol: Symbol.Number, value: 123 },
          { symbol: Symbol.SemiColon },
          { symbol: Symbol.BraceRight },
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
          { symbol: Symbol.BraceLeft },
          { symbol: Symbol.Identifier, value: "msg" },
          { symbol: Symbol.Equal },
          { symbol: Symbol.String, value: "Hello world" },
          { symbol: Symbol.SemiColon },
          { symbol: Symbol.BraceRight },
        ],
        lineNumber: 3,
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
