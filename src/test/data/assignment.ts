import { TokenType } from "../../token/type.ts";
import {
  Assignment,
  AssignmentWithIdentifier,
  Primary,
  PrimaryType,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Environment, Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
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
    value: new Value(ValueType.String, "mike"),
    environmentBefore: new Environment().add(
      "name",
      new Value(ValueType.String, "john"),
    ),
    environmentAfter: new Environment().add(
      "name",
      new Value(ValueType.String, "mike"),
    ),
  },
];
