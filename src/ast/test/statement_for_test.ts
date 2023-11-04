import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { makeStatement } from "../../ast/func.ts";
import {
  AssignmentWithIdentifier,
  FanctorsAndOperator,
  ForStatement,
  OperatorForFanctors,
  OperatorForTerms,
  Primary,
  PrimaryType,
  PrintStatement,
  TermsAndOperator,
  VariableDeclaration,
} from "../../ast/type.ts";
import { Token, TokenType } from "../../token/type.ts";

Deno.test("Testing makeForStatement()", async (t) => {
  type Test = {
    name: string;
    input: {
      tokens: Token[];
    };
    expected: {
      statment: ForStatement;
      leftTokens: Token[];
    };
  };
  const tests: Test[] = [
    {
      name: 'for (var i = 0; i < 3; i = i + 1) print "hello";',
      input: {
        tokens: [
          { type: TokenType.For },
          { type: TokenType.ParenLeft },
          { type: TokenType.Var },
          { type: TokenType.Identifier, value: "i" },
          { type: TokenType.Equal },
          { type: TokenType.Number, value: 0 },
          { type: TokenType.SemiColon },
          { type: TokenType.Identifier, value: "i" },
          { type: TokenType.Less },
          { type: TokenType.Number, value: 3 },
          { type: TokenType.SemiColon },
          { type: TokenType.Identifier, value: "i" },
          { type: TokenType.Equal },
          { type: TokenType.Identifier, value: "i" },
          { type: TokenType.Plus },
          { type: TokenType.Number, value: 1 },
          { type: TokenType.ParenRight },
          { type: TokenType.Print },
          { type: TokenType.String, value: "hello" },
          { type: TokenType.SemiColon },
        ],
      },
      expected: {
        statment: new ForStatement(
          new PrintStatement(new Primary(PrimaryType.String, "hello")),
          new VariableDeclaration("i", new Primary(PrimaryType.Number, 0)),
          new TermsAndOperator(
            new Primary(PrimaryType.Identifier, "i"),
            OperatorForTerms.Less,
            new Primary(PrimaryType.Number, 3),
          ),
          new AssignmentWithIdentifier(
            "i",
            new FanctorsAndOperator(
              new Primary(PrimaryType.Identifier, "i"),
              OperatorForFanctors.Plus,
              new Primary(PrimaryType.Number, 1),
            ),
          ),
        ),
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
