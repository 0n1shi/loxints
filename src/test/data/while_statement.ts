import { Token, TokenType } from "../../token/type.ts";
import {
  AssignmentWithIdentifier,
  Block,
  ExpressionStatement,
  FanctorsAndOperator,
  OperatorForFanctors,
  OperatorForTerms,
  Primary,
  PrimaryType,
  PrintStatement,
  TermsAndOperator,
  WhileStatement,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: WhileStatement;
};

export const whileStatementTests: TestData[] = [
  {
    name:
      'define a variable as a counter, then print "hello world" three times with the counter.',
    program: `while (count < 3) {
  print "hello world";
  count = count + 1;
}`,
    lines: 4,
    tokens: [
      { type: TokenType.While },
      { type: TokenType.ParenLeft },
      { type: TokenType.Identifier, value: "count" },
      { type: TokenType.Less },
      { type: TokenType.Number, value: 3 },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
      { type: TokenType.Identifier, value: "count" },
      { type: TokenType.Equal },
      { type: TokenType.Identifier, value: "count" },
      { type: TokenType.Plus },
      { type: TokenType.Number, value: 1 },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new WhileStatement(
      new TermsAndOperator(
        new Primary(PrimaryType.Identifier, "count"),
        OperatorForTerms.Less,
        new Primary(PrimaryType.Number, 3),
      ),
      new Block([
        new PrintStatement(
          new Primary(PrimaryType.String, "hello world"),
        ),
        new ExpressionStatement(
          new AssignmentWithIdentifier(
            "count",
            new FanctorsAndOperator(
              new Primary(PrimaryType.Identifier, "count"),
              OperatorForFanctors.Plus,
              new Primary(PrimaryType.Number, 1),
            ),
          ),
        ),
      ]),
    ),
  },
];
