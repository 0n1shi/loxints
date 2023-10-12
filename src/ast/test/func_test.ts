import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import {
  makeComparision,
  makeFanctor,
  makePrimary,
  makeTerm,
  makeUnary,
} from "../../ast/func.ts";
import {
  Comparision,
  Expression,
  Fanctor,
  Primary,
  Term,
  UnariesAndOperator,
  Unary,
  UnaryWithOperator,
} from "../../ast/type.ts";
import { Symbol, Token } from "../../token/type.ts";

Deno.test("Testing makeComparision()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      comparision: Comparision;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "Comparision: 3 < 5",
      input: {
        tokens: [
          { symbol: Symbol.Number, value: 3 },
          { symbol: Symbol.Less },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        comparision: {
          left: {
            type: Symbol.Number,
            value: 3,
          } as Primary,
          operator: Symbol.Less,
          right: {
            type: Symbol.Number,
            value: 5,
          } as Primary,
        },
        leftTokens: [],
      },
    },
    {
      name: "Comparision: -3 < 5",
      input: {
        tokens: [
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 3 },
          { symbol: Symbol.Less },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        comparision: {
          left: {
            operator: Symbol.Minus,
            right: {
              type: Symbol.Number,
              value: 3,
            } as Primary,
          } as Unary,
          operator: Symbol.Less,
          right: {
            type: Symbol.Number,
            value: 5,
          } as Primary,
        },
        leftTokens: [],
      },
    },
    {
      name: "Comparision: -3 < 5 + 10",
      input: {
        tokens: [
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 3 },
          { symbol: Symbol.Less },
          { symbol: Symbol.Number, value: 5 },
          { symbol: Symbol.Plus },
          { symbol: Symbol.Number, value: 10 },
        ],
      },
      expected: {
        comparision: {
          left: {
            operator: Symbol.Minus,
            right: {
              type: Symbol.Number,
              value: 3,
            } as Primary,
          } as Unary,
          operator: Symbol.Less,
          right: {
            left: {
              type: Symbol.Number,
              value: 5,
            },
            operator: Symbol.Plus,
            right: {
              type: Symbol.Number,
              value: 10,
            },
          } as Term,
        },
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [comparision, leftTokens] = makeComparision(test.input.tokens);
      assertEquals(comparision, test.expected.comparision);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

Deno.test("Testing makeTerm()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      term: Term;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "Addtion: 10 + 5",
      input: {
        tokens: [
          { symbol: Symbol.Number, value: 10 },
          { symbol: Symbol.Plus },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        term: {
          left: {
            type: Symbol.Number,
            value: 10,
          } as Primary,
          operator: Symbol.Plus,
          right: {
            type: Symbol.Number,
            value: 5,
          } as Primary,
        },
        leftTokens: [],
      },
    },
    {
      name: "Addtion: -10 + 5",
      input: {
        tokens: [
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 10 },
          { symbol: Symbol.Plus },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        term: {
          left: {
            operator: Symbol.Minus,
            right: {
              type: Symbol.Number,
              value: 10,
            } as Primary,
          } as Unary,
          operator: Symbol.Plus,
          right: {
            type: Symbol.Number,
            value: 5,
          } as Primary,
        },
        leftTokens: [],
      },
    },
    {
      name: "Subtraction: -10 - 5",
      input: {
        tokens: [
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 10 },
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        term: {
          left: {
            operator: Symbol.Minus,
            right: {
              type: Symbol.Number,
              value: 10,
            } as Primary,
          } as Unary,
          operator: Symbol.Minus,
          right: {
            type: Symbol.Number,
            value: 5,
          } as Primary,
        },
        leftTokens: [],
      },
    },
    {
      name: "Subtraction: -10 - -5",
      input: {
        tokens: [
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 10 },
          { symbol: Symbol.Minus },
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        term: {
          left: {
            operator: Symbol.Minus,
            right: {
              type: Symbol.Number,
              value: 10,
            } as Primary,
          } as Unary,
          operator: Symbol.Minus,
          right: {
            operator: Symbol.Minus,
            right: {
              type: Symbol.Number,
              value: 5,
            } as Primary,
          } as Unary,
        },
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [term, leftTokens] = makeTerm(test.input.tokens);
      assertEquals(term, test.expected.term);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

Deno.test("Testing makeFanctor()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      fanctor: Fanctor;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "Not false: !false",
      input: {
        tokens: [{ symbol: Symbol.Bang }, { symbol: Symbol.False }],
      },
      expected: {
        fanctor: {
          operator: Symbol.Bang,
          right: {
            type: Symbol.False,
          } as Primary,
        } as Unary,
        leftTokens: [],
      },
    },
    {
      name: "Division: 125 / 5",
      input: {
        tokens: [
          { symbol: Symbol.Number, value: 125 },
          { symbol: Symbol.Slash },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        fanctor: {
          left: {
            type: Symbol.Number,
            value: 125,
          } as Primary,
          operator: Symbol.Slash,
          right: {
            type: Symbol.Number,
            value: 5,
          } as Primary,
        } as UnariesAndOperator,
        leftTokens: [],
      },
    },
    {
      name: "Multiplication: -10 * 5",
      input: {
        tokens: [
          { symbol: Symbol.Minus },
          { symbol: Symbol.Number, value: 10 },
          { symbol: Symbol.Star },
          { symbol: Symbol.Number, value: 5 },
        ],
      },
      expected: {
        fanctor: {
          left: {
            operator: Symbol.Minus,
            right: {
              type: Symbol.Number,
              value: 10,
            } as Primary,
          } as Unary,
          operator: Symbol.Star,
          right: {
            type: Symbol.Number,
            value: 5,
          } as Primary,
        } as UnariesAndOperator,
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [fanctor, leftTokens] = makeFanctor(test.input.tokens);
      assertEquals(fanctor, test.expected.fanctor);
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
      name: "Not false: !false",
      input: {
        tokens: [{ symbol: Symbol.Bang }, { symbol: Symbol.False }],
      },
      expected: {
        unary: {
          operator: Symbol.Bang,
          right: { type: Symbol.False } as Primary,
        } as UnaryWithOperator,
        leftTokens: [],
      },
    },
    {
      name: "Not not false: !!false",
      input: {
        tokens: [
          { symbol: Symbol.Bang },
          { symbol: Symbol.Bang },
          { symbol: Symbol.False },
        ],
      },
      expected: {
        unary: {
          operator: Symbol.Bang,
          right: {
            operator: Symbol.Bang,
            right: {
              type: Symbol.False,
            } as Primary,
          } as UnaryWithOperator,
        },
        leftTokens: [],
      },
    },
    {
      name: "Minus number: -123",
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
          operator: Symbol.Minus,
          right: {
            type: Symbol.Number,
            value: 123,
          } as Primary,
        } as UnaryWithOperator,
        leftTokens: [],
      },
    },
    {
      name: "Number: 123",
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
          type: Symbol.Number,
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
        primary: { type: Symbol.False },
        leftTokens: [],
      },
    },
    {
      name: "String",
      input: {
        tokens: [{ symbol: Symbol.String, value: "Hello world" }],
      },
      expected: {
        primary: { type: Symbol.String, value: "Hello world" },
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
        primary: { type: Symbol.Number, value: 123 },
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
        primary: {} as Expression,
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
