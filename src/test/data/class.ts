import { TokenType } from "../../token/type.ts";
import {
  Block,
  ClassDeclaration,
  FanctorsAndOperator,
  FunctionDeclaration,
  OperatorForFanctors,
  Primary,
  PrimaryType,
  PrintStatement,
  ReturnStatement,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import { Class, Environment } from "../../eval/type.ts";
import { Value, ValueType } from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: ClassDeclaration;
};

export const classTests: TestData[] = [
  {
    name: "class declaration",
    program: `class User {
  id() {
    return 0;
  } 
}`,
    lines: 5,
    tokens: [
      { type: TokenType.Class },
      { type: TokenType.Identifier, value: "User" },
      { type: TokenType.BraceLeft },
      { type: TokenType.Identifier, value: "id" },
      { type: TokenType.ParenLeft },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Return },
      { type: TokenType.Number, value: 0 },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
      { type: TokenType.BraceRight },
    ],
    ast: new ClassDeclaration("User", [
      new FunctionDeclaration(
        "id",
        [],
        new Block([
          new ReturnStatement(new Primary(PrimaryType.Number, 0)),
        ]),
      ),
    ]),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment(),
    environmentAfter: new Environment().add(
      "User",
      new Value(ValueType.Class, new Class("User")),
    ),
  },
  {
    name: "class declaration 2",
    program: `class User {
  hi(name) {
    print "hi, " + name;
  } 
}`,
    lines: 5,
    tokens: [
      { type: TokenType.Class },
      { type: TokenType.Identifier, value: "User" },
      { type: TokenType.BraceLeft },
      { type: TokenType.Identifier, value: "hi" },
      { type: TokenType.ParenLeft },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hi, " },
      { type: TokenType.Plus },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
      { type: TokenType.BraceRight },
    ],
    ast: new ClassDeclaration("User", [
      new FunctionDeclaration(
        "hi",
        ["name"],
        new Block([
          new PrintStatement(
            new FanctorsAndOperator(
              new Primary(PrimaryType.String, "hi, "),
              OperatorForFanctors.Plus,
              new Primary(PrimaryType.Identifier, "name"),
            ),
          ),
        ]),
      ),
    ]),
    value: new Value(ValueType.Nil, null),
    environmentBefore: new Environment(),
    environmentAfter: new Environment().add(
      "User",
      new Value(ValueType.Class, new Class("User")),
    ),
  },
];
