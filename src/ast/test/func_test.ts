import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import {
  makeAssignment,
  makeComparision,
  makeDeclaration,
  makeEquality,
  makeFanctor,
  makePrimary,
  makeProgram,
  makeStatement,
  makeTerm,
  makeUnary,
} from "../../ast/func.ts";
import {
  Assignment,
  AssignmentWithIdentifier,
  Block,
  Comparision,
  ComparisionsAndOperator,
  Declaration,
  Equality,
  ExpressionStatement,
  Fanctor,
  FanctorsAndOperator,
  Group,
  OperatorForComparisions,
  OperatorForFanctors,
  OperatorForTerms,
  OperatorForUnaries,
  OperatorForUnary,
  Primary,
  PrimaryType,
  PrintStatement,
  Program,
  Statement,
  Term,
  TermsAndOperator,
  UnariesAndOperator,
  Unary,
  UnaryWithOperator,
  VariableDeclaration,
} from "../../ast/type.ts";
import { Token, TokenType } from "../../token/type.ts";

Deno.test("Testing makeProgram()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      program: Program;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: 'print 10 + 5; print "hello world.";',
      input: {
        tokens: [
          { type: TokenType.Print },
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 5 },
          { type: TokenType.SemiColon },
          { type: TokenType.Print },
          { type: TokenType.String, value: "hello world." },
          { type: TokenType.SemiColon },
        ],
      },
      expected: {
        program: new Program([
          new PrintStatement(
            new FanctorsAndOperator(
              new Primary(PrimaryType.Number, 10),
              OperatorForFanctors.Plus,
              new Primary(PrimaryType.Number, 5),
            ),
          ),
          new PrintStatement(
            new Primary(PrimaryType.String, "hello world."),
          ),
        ]),
        leftTokens: [],
      },
    },
    {
      name: 'var msg = "hello world"; print msg',
      input: {
        tokens: [
          { type: TokenType.Var },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "hello world" },
          { type: TokenType.SemiColon },
          { type: TokenType.Print },
          { type: TokenType.Identifier, value: "msg" },
        ],
      },
      expected: {
        program: new Program([
          new VariableDeclaration(
            "msg",
            new Primary(PrimaryType.String, "hello world"),
          ),
          new PrintStatement(
            new Primary(PrimaryType.Identifier, "msg"),
          ),
        ]),
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [program, leftTokens] = makeProgram(test.input.tokens);
      assertEquals(program, test.expected.program);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

Deno.test("Testing makeDeclaration()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      declaration: Declaration;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "var msg;",
      input: {
        tokens: [
          { type: TokenType.Var },
          { type: TokenType.Identifier, value: "msg" },
        ],
      },
      expected: {
        declaration: new VariableDeclaration("msg"),
        leftTokens: [],
      },
    },
    {
      name: 'var msg = "hello world";',
      input: {
        tokens: [
          { type: TokenType.Var },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "hello world" },
          { type: TokenType.SemiColon },
        ],
      },
      expected: {
        declaration: new VariableDeclaration(
          "msg",
          new Primary(PrimaryType.String, "hello world"),
        ),
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [statment, leftTokens] = makeDeclaration(test.input.tokens);
      assertEquals(statment, test.expected.declaration);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

Deno.test("Testing makeStatement()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      statment: Statement;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "print 10 + 5;",
      input: {
        tokens: [
          { type: TokenType.Print },
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 5 },
          { type: TokenType.SemiColon },
        ],
      },
      expected: {
        statment: new PrintStatement(
          new FanctorsAndOperator(
            new Primary(PrimaryType.Number, 10),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Number, 5),
          ),
        ),
        leftTokens: [],
      },
    },
    {
      name: "10 + 5;",
      input: {
        tokens: [
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 5 },
          { type: TokenType.SemiColon },
        ],
      },
      expected: {
        statment: new ExpressionStatement(
          new FanctorsAndOperator(
            new Primary(PrimaryType.Number, 10),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Number, 5),
          ),
        ),
        leftTokens: [],
      },
    },
    {
      name: `{
        var msg = "hello world"; 
      }`,
      input: {
        tokens: [
          { type: TokenType.BraceLeft },
          { type: TokenType.Var },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "hello world" },
          { type: TokenType.SemiColon },
          { type: TokenType.BraceRight },
        ],
      },
      expected: {
        statment: new Block([
          new VariableDeclaration(
            "msg",
            new Primary(PrimaryType.String, "hello world"),
          ),
        ]),
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [statment, leftTokens] = makeStatement(test.input.tokens);
      assertEquals(statment, test.expected.statment);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

Deno.test("Testing makeAssignment()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      assignment: Assignment;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "a = 10",
      input: {
        tokens: [
          { type: TokenType.Identifier, value: "a" },
          { type: TokenType.Equal },
          { type: TokenType.Number, value: 10 },
        ],
      },
      expected: {
        assignment: new AssignmentWithIdentifier(
          "a",
          new Primary(PrimaryType.Number, 10),
        ),
        leftTokens: [],
      },
    },
    {
      name: "a = -10",
      input: {
        tokens: [
          { type: TokenType.Identifier, value: "a" },
          { type: TokenType.Equal },
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 10 },
        ],
      },
      expected: {
        assignment: new AssignmentWithIdentifier(
          "a",
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 10),
          ),
        ),
        leftTokens: [],
      },
    },
    {
      name: "a = (1 == 1)",
      input: {
        tokens: [
          { type: TokenType.Identifier, value: "a" },
          { type: TokenType.Equal },
          { type: TokenType.ParenLeft },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.EqualEqual },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.ParenRight },
        ],
      },
      expected: {
        assignment: new AssignmentWithIdentifier(
          "a",
          new Primary(
            PrimaryType.Group,
            new Group(
              new ComparisionsAndOperator(
                new Primary(PrimaryType.Number, 1),
                OperatorForComparisions.EqualEqual,
                new Primary(PrimaryType.Number, 1),
              ),
            ),
          ),
        ),
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [equality, leftTokens] = makeAssignment(test.input.tokens);
      assertEquals(equality, test.expected.assignment);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

Deno.test("Testing makeEquality()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      equality: Equality;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: "-3 != 5",
      input: {
        tokens: [
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 3 },
          { type: TokenType.BangEqual },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        equality: new ComparisionsAndOperator(
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 3),
          ),
          OperatorForComparisions.BangEqual,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
    {
      name: "3 == 5",
      input: {
        tokens: [
          { type: TokenType.Number, value: 3 },
          { type: TokenType.EqualEqual },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        equality: new ComparisionsAndOperator(
          new Primary(PrimaryType.Number, 3),
          OperatorForComparisions.EqualEqual,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [equality, leftTokens] = makeEquality(test.input.tokens);
      assertEquals(equality, test.expected.equality);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});

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
      name: "3 < 5",
      input: {
        tokens: [
          { type: TokenType.Number, value: 3 },
          { type: TokenType.Less },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        comparision: new TermsAndOperator(
          new Primary(PrimaryType.Number, 3),
          OperatorForTerms.Less,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
    {
      name: "-3 < 5",
      input: {
        tokens: [
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 3 },
          { type: TokenType.Less },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        comparision: new TermsAndOperator(
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 3),
          ),
          OperatorForTerms.Less,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
    {
      name: "-3 < 5 + 10",
      input: {
        tokens: [
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 3 },
          { type: TokenType.Less },
          { type: TokenType.Number, value: 5 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 10 },
        ],
      },
      expected: {
        comparision: new TermsAndOperator(
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 3),
          ),
          OperatorForTerms.Less,
          new FanctorsAndOperator(
            new Primary(PrimaryType.Number, 5),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Number, 10),
          ),
        ),
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
      name: "10 + 5",
      input: {
        tokens: [
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        term: new FanctorsAndOperator(
          new Primary(PrimaryType.Number, 10),
          OperatorForFanctors.Plus,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
    {
      name: "-10 + 5",
      input: {
        tokens: [
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        term: new FanctorsAndOperator(
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 10),
          ),
          OperatorForFanctors.Plus,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
    {
      name: "-10 - 5",
      input: {
        tokens: [
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        term: new FanctorsAndOperator(
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 10),
          ),
          OperatorForFanctors.Minus,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
    {
      name: "-10 - -5",
      input: {
        tokens: [
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Minus },
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        term: new FanctorsAndOperator(
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 10),
          ),
          OperatorForFanctors.Minus,
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 5),
          ),
        ),
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
      name: "!false",
      input: {
        tokens: [{ type: TokenType.Bang }, { type: TokenType.False }],
      },
      expected: {
        fanctor: new UnaryWithOperator(
          OperatorForUnary.Bang,
          new Primary(PrimaryType.False),
        ),
        leftTokens: [],
      },
    },
    {
      name: "125 / 5",
      input: {
        tokens: [
          { type: TokenType.Number, value: 125 },
          { type: TokenType.Slash },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        fanctor: new UnariesAndOperator(
          new Primary(PrimaryType.Number, 125),
          OperatorForUnaries.Slash,
          new Primary(PrimaryType.Number, 5),
        ),
        leftTokens: [],
      },
    },
    {
      name: "-10 * 5",
      input: {
        tokens: [
          { type: TokenType.Minus },
          { type: TokenType.Number, value: 10 },
          { type: TokenType.Star },
          { type: TokenType.Number, value: 5 },
        ],
      },
      expected: {
        fanctor: new UnariesAndOperator(
          new UnaryWithOperator(
            OperatorForUnary.Minus,
            new Primary(PrimaryType.Number, 10),
          ),
          OperatorForUnaries.Star,
          new Primary(PrimaryType.Number, 5),
        ),
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
      name: "!false",
      input: {
        tokens: [
          { type: TokenType.Bang },
          { type: TokenType.False },
        ],
      },
      expected: {
        unary: new UnaryWithOperator(
          OperatorForUnary.Bang,
          new Primary(PrimaryType.False),
        ),
        leftTokens: [],
      },
    },
    {
      name: "!!false",
      input: {
        tokens: [
          { type: TokenType.Bang },
          { type: TokenType.Bang },
          { type: TokenType.False },
        ],
      },
      expected: {
        unary: new UnaryWithOperator(
          OperatorForUnary.Bang,
          new UnaryWithOperator(
            OperatorForUnary.Bang,
            new Primary(PrimaryType.False),
          ),
        ),
        leftTokens: [],
      },
    },
    {
      name: "-123",
      input: {
        tokens: [
          { type: TokenType.Minus },
          {
            type: TokenType.Number,
            value: 123,
          },
        ],
      },
      expected: {
        unary: new UnaryWithOperator(
          OperatorForUnary.Minus,
          new Primary(PrimaryType.Number, 123),
        ),
        leftTokens: [],
      },
    },
    {
      name: "123",
      input: {
        tokens: [
          {
            type: TokenType.Number,
            value: 123,
          },
        ],
      },
      expected: {
        unary: new Primary(PrimaryType.Number, 123),
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
      name: "Number",
      input: {
        tokens: [
          { type: TokenType.Number, value: 123 },
        ],
      },
      expected: {
        primary: new Primary(PrimaryType.Number, 123),
        leftTokens: [],
      },
    },
    {
      name: "Left token",
      input: {
        tokens: [
          { type: TokenType.Number, value: 123 },
          { type: TokenType.Minus },
        ],
      },
      expected: {
        primary: new Primary(PrimaryType.Number, 123),
        leftTokens: [{ type: TokenType.Minus } as Token],
      },
    },
    {
      name: "Group (3 + 2)",
      input: {
        tokens: [
          { type: TokenType.ParenLeft },
          { type: TokenType.Number, value: 3 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 2 },
          { type: TokenType.ParenRight },
        ],
      },
      expected: {
        primary: new Primary(
          PrimaryType.Group,
          new Group(
            new FanctorsAndOperator(
              new Primary(PrimaryType.Number, 3),
              OperatorForFanctors.Plus,
              new Primary(PrimaryType.Number, 2),
            ),
          ),
        ),
        leftTokens: [],
      },
    },
    {
      name: "Identifier",
      input: {
        tokens: [
          { type: TokenType.Identifier, value: "msg" },
        ],
      },
      expected: {
        primary: new Primary(
          PrimaryType.Identifier,
          "msg",
        ),
        leftTokens: [],
      },
    },
    {
      name: "Left tokens",
      input: {
        tokens: [
          { type: TokenType.Number, value: 3 },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 2 },
        ],
      },
      expected: {
        primary: new Primary(PrimaryType.Number, 3),
        leftTokens: [
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 2 },
        ],
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
