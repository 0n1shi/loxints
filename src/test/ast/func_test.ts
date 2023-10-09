import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { makePrimary, makeUnary } from "../../ast/func.ts";
import {
  Expression,
  Primary,
  PrimaryType,
  Unary,
  UnaryOperator,
  UnaryWithOperator,
} from "../../ast/type.ts";
import { Symbol, Token } from "../../token/type.ts";

Deno.test("Testing makePrimary()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      primary: Primary;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "False",
      input: {
        tokens: [{ symbol: Symbol.False }],
      },
      expected: {
        primary: { type: PrimaryType.False },
        leftTokens: [],
      },
    },
    {
      name: "String",
      input: {
        tokens: [{ symbol: Symbol.String, value: "Hello world" }],
      },
      expected: {
        primary: { type: PrimaryType.String, value: "Hello world" },
        leftTokens: [],
      },
    },
    {
      name: "Number with some lefts",
      input: {
        tokens: [
          { symbol: Symbol.Number, value: 123 },
          { symbol: Symbol.Minus },
        ],
      },
      expected: {
        primary: { type: PrimaryType.Number, value: 123 },
        leftTokens: [{ symbol: Symbol.Minus }],
      },
    },
    {
      name: "Expression",
      input: {
        tokens: [
          { symbol: Symbol.ParenLeft },
          { symbol: Symbol.ParenRight },
        ],
      },
      expected: {
        primary: { type: PrimaryType.Expression, value: {} as Expression },
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [primary, leftTokens] = makePrimary(test.input.tokens);
      assertEquals(primary, test.expected.primary);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

Deno.test("Testing makeUnary()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      unary: Unary;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "Not false (!false)",
      input: {
        tokens: [{ symbol: Symbol.Bang }, { symbol: Symbol.False }],
      },
      expected: {
        unary: {
          operator: UnaryOperator.Bang,
          unary: { type: PrimaryType.False } as Primary,
        },
        leftTokens: [],
      },
    },
    {
      name: "Not not false (!!false)",
      input: {
        tokens: [
          { symbol: Symbol.Bang },
          { symbol: Symbol.Bang },
          { symbol: Symbol.False },
        ],
      },
      expected: {
        unary: {
          operator: UnaryOperator.Bang,
          unary: {
            operator: UnaryOperator.Bang,
            unary: {
              type: PrimaryType.False,
            } as Primary,
          } as UnaryWithOperator,
        },
        leftTokens: [],
      },
    },
    {
      name: "Minus number (-123)",
      input: {
        tokens: [
          { symbol: Symbol.Minus },
          {
            symbol: Symbol.Number,
            value: 123,
          },
        ],
      },
      expected: {
        unary: {
          operator: UnaryOperator.Minus,
          unary: {
            type: PrimaryType.Number,
            value: 123,
          } as Primary,
        } as UnaryWithOperator,
        leftTokens: [],
      },
    },
    {
      name: "Number (123)",
      input: {
        tokens: [
          {
            symbol: Symbol.Number,
            value: 123,
          },
        ],
      },
      expected: {
        unary: {
          type: PrimaryType.Number,
          value: 123,
        } as Primary,
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [unary, leftTokens] = makeUnary(test.input.tokens);
      assertEquals(unary, test.expected.unary);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});
