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
  {
    name: "a = b = c = 1",
    program: "a = b = c = 1",
    lines: 1,
    tokens: [
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Equal },
      { type: TokenType.Identifier, value: "b" },
      { type: TokenType.Equal },
      { type: TokenType.Identifier, value: "c" },
      { type: TokenType.Equal },
      { type: TokenType.Number, value: 1 },
    ],
    ast: new AssignmentWithIdentifier(
      "a",
      new AssignmentWithIdentifier(
        "b",
        new AssignmentWithIdentifier(
          "c",
          new Primary(PrimaryType.Number, 1),
        ),
      ),
    ),
    value: new Value(ValueType.Number, 1),
    environmentBefore: new Environment()
      .add(
        "a",
        new Value(ValueType.Number, 0),
      )
      .add(
        "b",
        new Value(ValueType.Number, 0),
      )
      .add(
        "c",
        new Value(ValueType.Number, 0),
      ),
    environmentAfter: new Environment()
      .add(
        "a",
        new Value(ValueType.Number, 1),
      )
      .add(
        "b",
        new Value(ValueType.Number, 1),
      )
      .add(
        "c",
        new Value(ValueType.Number, 1),
      ),
  },
];
