import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { Symbol, Token } from "./src/token/type.ts";
import { tokenize } from "./src/token/func.ts";

Deno.test("tokenize", () => {
  type Test = {
    input: string;
    expected: Token[];
  };
  const tests: Test[] = [
    {
      input: "{ . -  / }",
      expected: [
        { symbol: Symbol.BraceLeft },
        { symbol: Symbol.Dot },
        { symbol: Symbol.Minus },
        { symbol: Symbol.Slash },
        { symbol: Symbol.BraceRight },
      ],
    },
  ];
  for (const test of tests) {
    assertEquals(tokenize(test.input), test.expected);
  }
});
