import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { makeStatement } from "../../ast/func.ts";
import {
  AssignmentWithIdentifier,
  Block,
  ExpressionStatement,
  FanctorsAndOperator,
  IfStatement,
  OperatorForFanctors,
  Primary,
  PrimaryType,
  PrintStatement,
  Statement,
  VariableDeclaration,
  WhileStatement,
} from "../../ast/type.ts";
import { Token, TokenType } from "../../token/type.ts";

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
    {
      name: `if (true) {
        msg = "hello world"; 
      }`,
      input: {
        tokens: [
          { type: TokenType.If },
          { type: TokenType.ParenLeft },
          { type: TokenType.True },
          { type: TokenType.ParenRight },
          { type: TokenType.BraceLeft },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "hello world" },
          { type: TokenType.SemiColon },
          { type: TokenType.BraceRight },
        ],
      },
      expected: {
        statment: new IfStatement(
          new Primary(PrimaryType.True),
          new Block([
            new ExpressionStatement(
              new AssignmentWithIdentifier(
                "msg",
                new Primary(PrimaryType.String, "hello world"),
              ),
            ),
          ]),
        ),
        leftTokens: [],
      },
    },
    {
      name: `while (true) {
        msg = "hello world"; 
      }`,
      input: {
        tokens: [
          { type: TokenType.While },
          { type: TokenType.ParenLeft },
          { type: TokenType.True },
          { type: TokenType.ParenRight },
          { type: TokenType.BraceLeft },
          { type: TokenType.Identifier, value: "msg" },
          { type: TokenType.Equal },
          { type: TokenType.String, value: "hello world" },
          { type: TokenType.SemiColon },
          { type: TokenType.BraceRight },
        ],
      },
      expected: {
        statment: new WhileStatement(
          new Primary(PrimaryType.True),
          new Block([
            new ExpressionStatement(
              new AssignmentWithIdentifier(
                "msg",
                new Primary(PrimaryType.String, "hello world"),
              ),
            ),
          ]),
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
