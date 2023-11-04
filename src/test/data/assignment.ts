import { Token, TokenType } from "../../token/type.ts";
import {
  Assignment,
  AssignmentWithIdentifier,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";

type TestData = {
  name: string;
  program: string;
  lines: number;
  tokens: Token[];
  ast: Assignment;
};

export const assignmentTests: TestData[] = [
  {
    name: 'name = "mike"',
    program: 'name = "mike"',
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.Equal },
      { type: TokenType.String, value: "mike" },
    ],
    ast: new AssignmentWithIdentifier(
      "name",
      new Primary(PrimaryType.String, "mike"),
    ),
  },
];
