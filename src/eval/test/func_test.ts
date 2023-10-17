import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import {
  Fanctor,
  FanctorsAndOperator,
  OperatorForFanctors,
  OperatorForUnaries,
  OperatorForUnary,
  Primary,
  PrimaryType,
  UnariesAndOperator,
  Unary,
  UnaryWithOperator,
} from "../../ast/type.ts";
import { Value, ValueType } from "../type.ts";
import { evaluateFanctor, evaluatePrimary, evaluateUnary } from "../func.ts";

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
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const val = evaluateFanctor(test.input);
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
      const val = evaluateUnary(test.input);
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
      const val = evaluateUnary(test.input);
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
  }];
  for (const test of tests) {
    await t.step(test.name, () => {
      const val = evaluatePrimary(test.input);
      assertEquals(val, test.expected);
    });
  }
});
