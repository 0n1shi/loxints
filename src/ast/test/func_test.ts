import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import {
  makeComparision,
  makeEquality,
  makeFanctor,
  makePrimary,
  makeTerm,
  makeUnary,
} from "../../ast/func.ts";
import {
  Comparision,
  Equality,
  Expression,
  Fanctor,
  Group,
  Primary,
  PrimaryType,
  Term,
  UnariesAndOperator,
  Unary,
  UnaryWithOperator,
} from "../../ast/type.ts";
import { Token, TokenType } from "../../token/type.ts";

// Deno.test("Testing makeEquality()", async (t) => {
//   type Test = {
//     name: string;
//     input: {
//       tokens: Token[];
//     };
//     expected: {
//       equality: Equality;
//       leftTokens: Token[];
//     };
//   };
//   const tests: Test[] = [
//     {
//       name: "-3 != 5",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 3 },
//           { type: TokenType.BangEqual },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         equality: {
//           left: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 3,
//             } as PrimaryValue,
//           } as Unary,
//           operator: TokenType.BangEqual,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as PrimaryValue,
//         },
//         leftTokens: [],
//       },
//     },
//     {
//       name: "3 == 5",
//       input: {
//         tokens: [
//           { type: TokenType.Number, value: 3 },
//           { type: TokenType.EqualEqual },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         equality: {
//           left: {
//             type: TokenType.Number,
//             value: 3,
//           } as PrimaryValue,
//           operator: TokenType.EqualEqual,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as PrimaryValue,
//         },
//         leftTokens: [],
//       },
//     },
//   ];
//   for (const test of tests) {
//     await t.step(test.name, () => {
//       const [equality, leftTokens] = makeEquality(test.input.tokens);
//       assertEquals(equality, test.expected.equality);
//       assertEquals(leftTokens, test.expected.leftTokens);
//     });
//   }
// });

// Deno.test("Testing makeComparision()", async (t) => {
//   type Test = {
//     name: string;
//     input: {
//       tokens: Token[];
//     };
//     expected: {
//       comparision: Comparision;
//       leftTokens: Token[];
//     };
//   };
//   const tests: Test[] = [
//     {
//       name: "3 < 5",
//       input: {
//         tokens: [
//           { type: TokenType.Number, value: 3 },
//           { type: TokenType.Less },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         comparision: {
//           left: {
//             type: TokenType.Number,
//             value: 3,
//           } as Primary,
//           operator: TokenType.Less,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as Primary,
//         },
//         leftTokens: [],
//       },
//     },
//     {
//       name: "-3 < 5",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 3 },
//           { type: TokenType.Less },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         comparision: {
//           left: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 3,
//             } as Primary,
//           } as Unary,
//           operator: TokenType.Less,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as Primary,
//         },
//         leftTokens: [],
//       },
//     },
//     {
//       name: "-3 < 5 + 10",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 3 },
//           { type: TokenType.Less },
//           { type: TokenType.Number, value: 5 },
//           { type: TokenType.Plus },
//           { type: TokenType.Number, value: 10 },
//         ],
//       },
//       expected: {
//         comparision: {
//           left: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 3,
//             } as Primary,
//           } as Unary,
//           operator: TokenType.Less,
//           right: {
//             left: {
//               type: TokenType.Number,
//               value: 5,
//             },
//             operator: TokenType.Plus,
//             right: {
//               type: TokenType.Number,
//               value: 10,
//             },
//           } as Term,
//         },
//         leftTokens: [],
//       },
//     },
//   ];
//   for (const test of tests) {
//     await t.step(test.name, () => {
//       const [comparision, leftTokens] = makeComparision(test.input.tokens);
//       assertEquals(comparision, test.expected.comparision);
//       assertEquals(leftTokens, test.expected.leftTokens);
//     });
//   }
// });

// Deno.test("Testing makeTerm()", async (t) => {
//   type Test = {
//     name: string;
//     input: {
//       tokens: Token[];
//     };
//     expected: {
//       term: Term;
//       leftTokens: Token[];
//     };
//   };
//   const tests: Test[] = [
//     {
//       name: "10 + 5",
//       input: {
//         tokens: [
//           { type: TokenType.Number, value: 10 },
//           { type: TokenType.Plus },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         term: {
//           left: {
//             type: TokenType.Number,
//             value: 10,
//           } as Primary,
//           operator: TokenType.Plus,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as Primary,
//         },
//         leftTokens: [],
//       },
//     },
//     {
//       name: "-10 + 5",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 10 },
//           { type: TokenType.Plus },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         term: {
//           left: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 10,
//             } as Primary,
//           } as Unary,
//           operator: TokenType.Plus,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as Primary,
//         },
//         leftTokens: [],
//       },
//     },
//     {
//       name: "-10 - 5",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 10 },
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         term: {
//           left: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 10,
//             } as Primary,
//           } as Unary,
//           operator: TokenType.Minus,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as Primary,
//         },
//         leftTokens: [],
//       },
//     },
//     {
//       name: "-10 - -5",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 10 },
//           { type: TokenType.Minus },
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         term: {
//           left: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 10,
//             } as Primary,
//           } as Unary,
//           operator: TokenType.Minus,
//           right: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 5,
//             } as Primary,
//           } as Unary,
//         },
//         leftTokens: [],
//       },
//     },
//   ];
//   for (const test of tests) {
//     await t.step(test.name, () => {
//       const [term, leftTokens] = makeTerm(test.input.tokens);
//       assertEquals(term, test.expected.term);
//       assertEquals(leftTokens, test.expected.leftTokens);
//     });
//   }
// });

// Deno.test("Testing makeFanctor()", async (t) => {
//   type Test = {
//     name: string;
//     input: {
//       tokens: Token[];
//     };
//     expected: {
//       fanctor: Fanctor;
//       leftTokens: Token[];
//     };
//   };
//   const tests: Test[] = [
//     {
//       name: "!false",
//       input: {
//         tokens: [{ type: TokenType.Bang }, { type: TokenType.False }],
//       },
//       expected: {
//         fanctor: {
//           operator: TokenType.Bang,
//           right: {
//             type: TokenType.False,
//           } as Primary,
//         } as Unary,
//         leftTokens: [],
//       },
//     },
//     {
//       name: "125 / 5",
//       input: {
//         tokens: [
//           { type: TokenType.Number, value: 125 },
//           { type: TokenType.Slash },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         fanctor: {
//           left: {
//             type: TokenType.Number,
//             value: 125,
//           } as Primary,
//           operator: TokenType.Slash,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as Primary,
//         } as UnariesAndOperator,
//         leftTokens: [],
//       },
//     },
//     {
//       name: "-10 * 5",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           { type: TokenType.Number, value: 10 },
//           { type: TokenType.Star },
//           { type: TokenType.Number, value: 5 },
//         ],
//       },
//       expected: {
//         fanctor: {
//           left: {
//             operator: TokenType.Minus,
//             right: {
//               type: TokenType.Number,
//               value: 10,
//             } as Primary,
//           } as Unary,
//           operator: TokenType.Star,
//           right: {
//             type: TokenType.Number,
//             value: 5,
//           } as Primary,
//         } as UnariesAndOperator,
//         leftTokens: [],
//       },
//     },
//   ];
//   for (const test of tests) {
//     await t.step(test.name, () => {
//       const [fanctor, leftTokens] = makeFanctor(test.input.tokens);
//       assertEquals(fanctor, test.expected.fanctor);
//       assertEquals(leftTokens, test.expected.leftTokens);
//     });
//   }
// });

// Deno.test("Testing makeUnary()", async (t) => {
//   type Test = {
//     name: string;
//     input: {
//       tokens: Token[];
//     };
//     expected: {
//       unary: Unary;
//       leftTokens: Token[];
//     };
//   };
//   const tests: Test[] = [
//     {
//       name: "!false",
//       input: {
//         tokens: [{ type: TokenType.Bang }, { type: TokenType.False }],
//       },
//       expected: {
//         unary: {
//           operator: TokenType.Bang,
//           right: { type: TokenType.False } as Primary,
//         } as UnaryWithOperator,
//         leftTokens: [],
//       },
//     },
//     {
//       name: "!!false",
//       input: {
//         tokens: [
//           { type: TokenType.Bang },
//           { type: TokenType.Bang },
//           { type: TokenType.False },
//         ],
//       },
//       expected: {
//         unary: {
//           operator: TokenType.Bang,
//           right: {
//             operator: TokenType.Bang,
//             right: {
//               type: TokenType.False,
//             } as Primary,
//           } as UnaryWithOperator,
//         },
//         leftTokens: [],
//       },
//     },
//     {
//       name: "-123",
//       input: {
//         tokens: [
//           { type: TokenType.Minus },
//           {
//             type: TokenType.Number,
//             value: 123,
//           },
//         ],
//       },
//       expected: {
//         unary: {
//           operator: TokenType.Minus,
//           right: {
//             type: TokenType.Number,
//             value: 123,
//           } as Primary,
//         } as UnaryWithOperator,
//         leftTokens: [],
//       },
//     },
//     {
//       name: "123",
//       input: {
//         tokens: [
//           {
//             type: TokenType.Number,
//             value: 123,
//           },
//         ],
//       },
//       expected: {
//         unary: {
//           type: TokenType.Number,
//           value: 123,
//         } as Primary,
//         leftTokens: [],
//       },
//     },
//   ];
//   for (const test of tests) {
//     await t.step(test.name, () => {
//       const [unary, leftTokens] = makeUnary(test.input.tokens);
//       assertEquals(unary, test.expected.unary);
//       assertEquals(leftTokens, test.expected.leftTokens);
//     });
//   }
// });

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
        tokens: [{ type: TokenType.False }],
      },
      expected: {
        primary: new Primary(PrimaryType.False),
        leftTokens: [],
      },
    },
    {
      name: "String",
      input: {
        tokens: [{ type: TokenType.String, value: "Hello world" }],
      },
      expected: {
        primary: new Primary(PrimaryType.String, "Hello world"),
        leftTokens: [],
      },
    },
    {
      name: "Number with some lefts",
      input: {
        tokens: [
          { type: TokenType.Number, value: 123 },
          { type: TokenType.Minus },
        ],
      },
      expected: {
        primary: new Primary(PrimaryType.Number, 123),
        leftTokens: [{ type: TokenType.Minus }],
      },
    },
    // {
    //   name: "Group (3 + 2)",
    //   input: {
    //     tokens: [
    //       { type:TokenType.ParenLeft },
    //       { type:TokenType.Number, value: 3 },
    //       { type:TokenType.Plus },
    //       { type:TokenType.Number, value: 2 },
    //       { type:TokenType.ParenRight },
    //     ],
    //   },
    //   expected: {
    //     primary: new Group(new Ex){
    //       left: TokenType.ParenLeft,
    //       middle: {
    //         left: { type: TokenType.Number, value: 3 } as PrimaryValue,
    //         operator: TokenType.Plus,
    //         right: { type: TokenType.Number, value: 2 } as PrimaryValue,
    //       } as Expression,
    //       right: TokenType.ParenRight,
    //     } as Group,
    //     leftTokens: [],
    //   },
    // },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [primary, leftTokens] = makePrimary(test.input.tokens);
      assertEquals(primary, test.expected.primary);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});
