import { Token, TokenType } from "../../token/type.ts";
import {
  AssignmentWithIdentifier,
  Block,
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

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: ForStatement;
};

export const forStatementTests: TestData[] = [
  {
    name: 'print "hello world" in for.',
    program: `for (var i = 0; i < 3; i = i + 1) print "hello world";`,
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
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
    ],
    ast: new ForStatement(
      new PrintStatement(new Primary(PrimaryType.String, "hello world")),
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
  },
  {
    name: 'print "hello world" in for block.',
    program: `for (var i = 0; i < 3; i = i + 1) {
  print "hello world";
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
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new ForStatement(
      new Block([
        new PrintStatement(new Primary(PrimaryType.String, "hello world")),
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
  },
];
