import { TokenType } from "../../token/type.ts";
import {
  AssignmentWithIdentifier,
  Block,
  ExpressionStatement,
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
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: ForStatement;
};

export const forStatementTests: TestData[] = [
  {
    name: "increment coutner in for.",
    program: `for (var i = 0; i < 3; i = i + 1) counter = counter + 1;`,
    lines: 1,
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
      { type: TokenType.Identifier, value: "counter" },
      { type: TokenType.Equal },
      { type: TokenType.Identifier, value: "counter" },
      { type: TokenType.Plus },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.SemiColon },
    ],
    ast: new ForStatement(
      new ExpressionStatement(
        new AssignmentWithIdentifier(
          "counter",
          new FanctorsAndOperator(
            new Primary(PrimaryType.Identifier, "counter"),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Number, 1),
          ),
        ),
      ),
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
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment().add(
      "counter",
      new Value(ValueType.Number, 0),
    ),
    environmentAfter: new Environment().add(
      "counter",
      new Value(ValueType.Number, 3),
    ),
  },
  {
    name: "increment counter in for block.",
    program: `for (var i = 0; i < 3; i = i + 1) {
  counter = counter + 1;
}`,
    lines: 3,
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
      { type: TokenType.BraceLeft },
      { type: TokenType.Identifier, value: "counter" },
      { type: TokenType.Equal },
      { type: TokenType.Identifier, value: "counter" },
      { type: TokenType.Plus },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new ForStatement(
      new Block([
        new ExpressionStatement(
          new AssignmentWithIdentifier(
            "counter",
            new FanctorsAndOperator(
              new Primary(PrimaryType.Identifier, "counter"),
              OperatorForFanctors.Plus,
              new Primary(PrimaryType.Number, 1),
            ),
          ),
        ),
      ]),
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
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment().add(
      "counter",
      new Value(ValueType.Number, 0),
    ),
    environmentAfter: new Environment().add(
      "counter",
      new Value(ValueType.Number, 3),
    ),
  },
];
