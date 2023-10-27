import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import {
  Assignment,
  AssignmentWithIdentifier,
  Block,
  Comparision,
  ComparisionsAndOperator,
  Equality,
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
  Statement,
  Term,
  TermsAndOperator,
  UnariesAndOperator,
  Unary,
  UnaryWithOperator,
  VariableDeclaration,
} from "../../ast/type.ts";
import { Environment, Value, ValueType } from "../type.ts";
import {
  evaluateAssignment,
  evaluateComparision,
  evaluateEquality,
  evaluateFanctor,
  evaluatePrimary,
  evaluateStatement,
  evaluateTerm,
  evaluateUnary,
} from "../func.ts";
import { assert } from "https://deno.land/std@0.198.0/assert/assert.ts";

Deno.test("Testing evaluateAssignment()", async (t) => {
  type Test = {
    name: string;
    input: Assignment;
    expected: {
      identifier: string;
      val: Value;
    };
  };
  const tests: Test[] = [
    {
      name: "a = 10",
      input: new AssignmentWithIdentifier(
        "a",
        new Primary(PrimaryType.Number, 10),
      ),
      expected: {
        identifier: "a",
        val: new Value(ValueType.Number, 10),
      },
    },
    {
      name: "a = -10",
      input: new AssignmentWithIdentifier(
        "a",
        new UnaryWithOperator(
          OperatorForUnary.Minus,
          new Primary(PrimaryType.Number, 10),
        ),
      ),
      expected: {
        identifier: "a",
        val: new Value(ValueType.Number, -10),
      },
    },
    {
      name: "a = 10 + 1",
      input: new AssignmentWithIdentifier(
        "a",
        new FanctorsAndOperator(
          new Primary(PrimaryType.Number, 10),
          OperatorForFanctors.Plus,
          new Primary(PrimaryType.Number, 1),
        ),
      ),
      expected: {
        identifier: "a",
        val: new Value(ValueType.Number, 11),
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const env: Environment = new Environment();
      env.set(test.expected.identifier, new Value(ValueType.Number, -1));

      evaluateAssignment(test.input, env);

      assertEquals(
        test.expected.val.type,
        env.get(test.expected.identifier)?.type,
      );
      assertEquals(
        test.expected.val.value,
        env.get(test.expected.identifier)?.value,
      );
    });
  }
});

Deno.test("Testing evaluateEquality()", async (t) => {
  type Test = {
    name: string;
    input: Equality;
    expected: Value;
  };
  const tests: Test[] = [{
    name: "3 == 3",
    input: new ComparisionsAndOperator(
      new Primary(PrimaryType.Number, 3),
      OperatorForComparisions.EqualEqual,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, true),
  }, {
    name: "3 != 3",
    input: new ComparisionsAndOperator(
      new Primary(PrimaryType.Number, 3),
      OperatorForComparisions.BangEqual,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, false),
  }, {
    name: "4 == 3",
    input: new ComparisionsAndOperator(
      new Primary(PrimaryType.Number, 4),
      OperatorForComparisions.EqualEqual,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, false),
  }, {
    name: "10 != 3",
    input: new ComparisionsAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForComparisions.BangEqual,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, true),
  }];
  for (const test of tests) {
    const env: Environment = new Environment();
    await t.step(test.name, () => {
      const val = evaluateEquality(test.input, env);
      assertEquals(val, test.expected);
    });
  }
});

Deno.test("Testing evaluateComparision()", async (t) => {
  type Test = {
    name: string;
    input: Comparision;
    expected: Value;
  };
  const tests: Test[] = [{
    name: "3 < 3",
    input: new TermsAndOperator(
      new Primary(PrimaryType.Number, 3),
      OperatorForTerms.Less,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, false),
  }, {
    name: "10 > 3",
    input: new TermsAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForTerms.Greater,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, true),
  }, {
    name: "10 <= 3",
    input: new TermsAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForTerms.LessEqual,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, false),
  }, {
    name: "10 >= 3",
    input: new TermsAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForTerms.GreaterEqual,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Boolean, true),
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const env: Environment = new Environment();
      const val = evaluateComparision(test.input, env);
      assertEquals(val, test.expected);
    });
  }
});

Deno.test("Testing evaluateTerm()", async (t) => {
  type Test = {
    name: string;
    input: Term;
    expected: Value;
  };
  const tests: Test[] = [{
    name: "3 + 3",
    input: new FanctorsAndOperator(
      new Primary(PrimaryType.Number, 3),
      OperatorForFanctors.Plus,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Number, 6),
  }, {
    name: '"hello" + 3',
    input: new FanctorsAndOperator(
      new Primary(PrimaryType.String, "hello"),
      OperatorForFanctors.Plus,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.String, "hello3"),
  }, {
    name: '3 + "hello"',
    input: new FanctorsAndOperator(
      new Primary(PrimaryType.Number, 3),
      OperatorForFanctors.Plus,
      new Primary(PrimaryType.String, "hello"),
    ),
    expected: new Value(ValueType.String, "3hello"),
  }, {
    name: '"hello" + "hello"',
    input: new FanctorsAndOperator(
      new Primary(PrimaryType.String, "hello"),
      OperatorForFanctors.Plus,
      new Primary(PrimaryType.String, "hello"),
    ),
    expected: new Value(ValueType.String, "hellohello"),
  }, {
    name: "-8 - 10",
    input: new FanctorsAndOperator(
      new UnaryWithOperator(
        OperatorForUnary.Minus,
        new Primary(PrimaryType.Number, 8),
      ),
      OperatorForFanctors.Minus,
      new Primary(PrimaryType.Number, 10),
    ),
    expected: new Value(ValueType.Number, -18),
  }, {
    name: "10 - 2",
    input: new FanctorsAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForFanctors.Minus,
      new Primary(PrimaryType.Number, 2),
    ),
    expected: new Value(ValueType.Number, 8),
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const env: Environment = new Environment();
      const val = evaluateTerm(test.input, env);
      assertEquals(val, test.expected);
    });
  }
});

Deno.test("Testing evaluateFanctor()", async (t) => {
  type Test = {
    name: string;
    input: Fanctor;
    expected: Value;
  };
  const tests: Test[] = [{
    name: "3 * 3",
    input: new UnariesAndOperator(
      new Primary(PrimaryType.Number, 3),
      OperatorForUnaries.Star,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.Number, 9),
  }, {
    name: '"hello" * 3',
    input: new UnariesAndOperator(
      new Primary(PrimaryType.String, "hello"),
      OperatorForUnaries.Star,
      new Primary(PrimaryType.Number, 3),
    ),
    expected: new Value(ValueType.String, "hellohellohello"),
  }, {
    name: "10 / 2",
    input: new UnariesAndOperator(
      new Primary(PrimaryType.Number, 10),
      OperatorForUnaries.Slash,
      new Primary(PrimaryType.Number, 2),
    ),
    expected: new Value(ValueType.Number, 5),
  }, {
    name: "-10 * 2",
    input: new UnariesAndOperator(
      new UnaryWithOperator(
        OperatorForUnary.Minus,
        new Primary(PrimaryType.Number, 10),
      ),
      OperatorForUnaries.Star,
      new Primary(PrimaryType.Number, 2),
    ),
    expected: new Value(ValueType.Number, -20),
  }, {
    name: "-10 * (3 + 2)",
    input: new UnariesAndOperator(
      new UnaryWithOperator(
        OperatorForUnary.Minus,
        new Primary(PrimaryType.Number, 10),
      ),
      OperatorForUnaries.Star,
      new Primary(
        PrimaryType.Group,
        new Group(
          new FanctorsAndOperator(
            new Primary(PrimaryType.Number, 3),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Number, 2),
          ),
        ),
      ),
    ),
    expected: new Value(ValueType.Number, -50),
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const env: Environment = new Environment();
      const val = evaluateFanctor(test.input, env);
      assertEquals(val, test.expected);
    });
  }
});

Deno.test("Testing evaluateUnary()", async (t) => {
  type Test = {
    name: string;
    input: Unary;
    expected: Value;
  };
  const tests: Test[] = [{
    name: "!true",
    input: new UnaryWithOperator(
      OperatorForUnary.Bang,
      new Primary(PrimaryType.True),
    ),
    expected: new Value(ValueType.Boolean, false),
  }, {
    name: "!!true",
    input: new UnaryWithOperator(
      OperatorForUnary.Bang,
      new UnaryWithOperator(
        OperatorForUnary.Bang,
        new Primary(PrimaryType.True),
      ),
    ),
    expected: new Value(ValueType.Boolean, true),
  }, {
    name: "-123",
    input: new UnaryWithOperator(
      OperatorForUnary.Minus,
      new Primary(PrimaryType.Number, 123),
    ),
    expected: new Value(ValueType.Number, -123),
  }, {
    name: "--123",
    input: new UnaryWithOperator(
      OperatorForUnary.Minus,
      new UnaryWithOperator(
        OperatorForUnary.Minus,
        new Primary(PrimaryType.Number, 123),
      ),
    ),
    expected: new Value(ValueType.Number, 123),
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const env: Environment = new Environment();
      const val = evaluateUnary(test.input, env);
      assertEquals(val, test.expected);
    });
  }
});

Deno.test("Testing evaluateUnary()", async (t) => {
  type Test = {
    name: string;
    input: Unary;
    expected: Value;
  };
  const tests: Test[] = [{
    name: "!true",
    input: new UnaryWithOperator(
      OperatorForUnary.Bang,
      new Primary(PrimaryType.True),
    ),
    expected: new Value(ValueType.Boolean, false),
  }, {
    name: "!!true",
    input: new UnaryWithOperator(
      OperatorForUnary.Bang,
      new UnaryWithOperator(
        OperatorForUnary.Bang,
        new Primary(PrimaryType.True),
      ),
    ),
    expected: new Value(ValueType.Boolean, true),
  }, {
    name: "-123",
    input: new UnaryWithOperator(
      OperatorForUnary.Minus,
      new Primary(PrimaryType.Number, 123),
    ),
    expected: new Value(ValueType.Number, -123),
  }, {
    name: "--123",
    input: new UnaryWithOperator(
      OperatorForUnary.Minus,
      new UnaryWithOperator(
        OperatorForUnary.Minus,
        new Primary(PrimaryType.Number, 123),
      ),
    ),
    expected: new Value(ValueType.Number, 123),
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const env: Environment = new Environment();
      const val = evaluateUnary(test.input, env);
      assertEquals(val, test.expected);
    });
  }
});
Deno.test("Testing evaluatePrimary()", async (t) => {
  type Test = {
    name: string;
    input: Primary;
    expected: Value;
  };
  const tests: Test[] = [{
    name: "number",
    input: new Primary(PrimaryType.Number, 5),
    expected: new Value(ValueType.Number, 5),
  }, {
    name: "string",
    input: new Primary(PrimaryType.String, "Hello world"),
    expected: new Value(ValueType.String, "Hello world"),
  }, {
    name: "true",
    input: new Primary(PrimaryType.True),
    expected: new Value(ValueType.Boolean, true),
  }, {
    name: "false",
    input: new Primary(PrimaryType.False),
    expected: new Value(ValueType.Boolean, false),
  }, {
    name: "nil",
    input: new Primary(PrimaryType.Nil),
    expected: new Value(ValueType.Nil, null),
  }, {
    name: "group",
    input: new Primary(
      PrimaryType.Group,
      new Group(
        new UnaryWithOperator(
          OperatorForUnary.Minus,
          new Primary(PrimaryType.Number, 3),
        ),
      ),
    ),
    expected: new Value(ValueType.Number, -3),
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const env: Environment = new Environment();
      const val = evaluatePrimary(test.input, env);
      assertEquals(val, test.expected);
    });
  }
});
