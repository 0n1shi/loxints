import { Token, TokenType } from "../../token/type.ts";
import {
  Comparision,
  OperatorForTerms,
  Primary,
  PrimaryType,
  TermsAndOperator,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Comparision;
};

export const comparisionTests: TestData[] = [
  {
    name: "1 < 2",
    program: "1 < 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Less },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new TermsAndOperator(
      new Primary(PrimaryType.Number, 1),
      OperatorForTerms.Less,
      new Primary(PrimaryType.Number, 2),
    ),
  },
  {
    name: "1 <= 2",
    program: "1 <= 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.LessEqual },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new TermsAndOperator(
      new Primary(PrimaryType.Number, 1),
      OperatorForTerms.LessEqual,
      new Primary(PrimaryType.Number, 2),
    ),
  },
  {
    name: "1 > 2",
    program: "1 > 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.Greater },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new TermsAndOperator(
      new Primary(PrimaryType.Number, 1),
      OperatorForTerms.Greater,
      new Primary(PrimaryType.Number, 2),
    ),
  },
  {
    name: "1 >= 2",
    program: "1 >= 2",
    lines: 1,
    tokens: [
      { type: TokenType.Number, value: 1 },
      { type: TokenType.GreaterEqual },
      { type: TokenType.Number, value: 2 },
    ],
    ast: new TermsAndOperator(
      new Primary(PrimaryType.Number, 1),
      OperatorForTerms.GreaterEqual,
      new Primary(PrimaryType.Number, 2),
    ),
  },
];
