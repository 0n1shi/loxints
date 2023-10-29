import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { makeAssignment } from "../../ast/func.ts";
import {
  Assignment,
  AssignmentWithIdentifier,
  ComparisionsAndOperator,
  EqualitiesWithAnd,
  Group,
  LogicAndsWithOr,
  OperatorForComparisions,
  OperatorForUnary,
  Primary,
  PrimaryType,
  UnaryWithOperator,
} from "../../ast/type.ts";
import { Token, TokenType } from "../../token/type.ts";

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
    {
      name: "val = 1 == 1 and 2 == 2",
      input: {
        tokens: [
          { type: TokenType.Identifier, value: "val" },
          { type: TokenType.Equal },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.EqualEqual },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.And },
          { type: TokenType.Number, value: 2 },
          { type: TokenType.EqualEqual },
          { type: TokenType.Number, value: 2 },
        ],
      },
      expected: {
        assignment: new AssignmentWithIdentifier(
          "val",
          new EqualitiesWithAnd(
            new ComparisionsAndOperator(
              new Primary(PrimaryType.Number, 1),
              OperatorForComparisions.EqualEqual,
              new Primary(PrimaryType.Number, 1),
            ),
            new ComparisionsAndOperator(
              new Primary(PrimaryType.Number, 2),
              OperatorForComparisions.EqualEqual,
              new Primary(PrimaryType.Number, 2),
            ),
          ),
        ),
        leftTokens: [],
      },
    },
    {
      name: "val = 1 == 1 or true and true",
      input: {
        tokens: [
          { type: TokenType.Identifier, value: "val" },
          { type: TokenType.Equal },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.EqualEqual },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.Or },
          { type: TokenType.True },
          { type: TokenType.And },
          { type: TokenType.True },
        ],
      },
      expected: {
        assignment: new AssignmentWithIdentifier(
          "val",
          new LogicAndsWithOr(
            new ComparisionsAndOperator(
              new Primary(PrimaryType.Number, 1),
              OperatorForComparisions.EqualEqual,
              new Primary(PrimaryType.Number, 1),
            ),
            new EqualitiesWithAnd(
              new Primary(PrimaryType.True),
              new Primary(PrimaryType.True),
            ),
          ),
        ),
        leftTokens: [],
      },
    },
  ];
  for (const test of tests) {
    await t.step(test.name, () => {
      const [assignment, leftTokens] = makeAssignment(test.input.tokens);
      assertEquals(assignment, test.expected.assignment);
      assertEquals(leftTokens, test.expected.leftTokens);
    });
  }
});
