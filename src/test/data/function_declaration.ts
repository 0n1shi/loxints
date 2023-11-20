import { TokenType } from "../../token/type.ts";
import {
  Block,
  FanctorsAndOperator,
  FunctionDeclaration,
  OperatorForFanctors,
  Primary,
  PrimaryType,
  PrintStatement,
} from "../../ast/type.ts";
import { TestDataBase } from "./data.ts";
import {
  Environment,
  UserFunction,
  Value,
  ValueType,
} from "../../eval/type.ts";

type TestData = TestDataBase & {
  ast: FunctionDeclaration;
};

// TODO: find out better way to do this ...
const helloFuncEnv = new Environment();
const greetFuncEnv = new Environment();
const addFuncEnv = new Environment();

export const functionDeclarationTests: TestData[] = [
  {
    name: "hello()",
    program: `fun hello() {
  print "hello world";
}`,
    lines: 3,
    tokens: [
      { type: TokenType.Fun },
      { type: TokenType.Identifier, value: "hello" },
      { type: TokenType.ParenLeft },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello world" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new FunctionDeclaration(
      "hello",
      [],
      new Block([
        new PrintStatement(new Primary(PrimaryType.String, "hello world")),
      ]),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: helloFuncEnv,
    environmentAfter: new Environment()
      .add(
        "hello",
        new Value(
          ValueType.UserFunction,
          new UserFunction(
            [],
            new Block([
              new PrintStatement(
                new Primary(PrimaryType.String, "hello world"),
              ),
            ]),
            helloFuncEnv,
          ),
        ),
      ),
  },
  {
    name: "greet to a name",
    program: `fun greet(name) {
  print "hello, " + name;
}`,
    lines: 3,
    tokens: [
      { type: TokenType.Fun },
      { type: TokenType.Identifier, value: "greet" },
      { type: TokenType.ParenLeft },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.String, value: "hello, " },
      { type: TokenType.Plus },
      { type: TokenType.Identifier, value: "name" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new FunctionDeclaration(
      "greet",
      ["name"],
      new Block([
        new PrintStatement(
          new FanctorsAndOperator(
            new Primary(PrimaryType.String, "hello, "),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Identifier, "name"),
          ),
        ),
      ]),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: greetFuncEnv,
    environmentAfter: new Environment()
      .add(
        "greet",
        new Value(
          ValueType.UserFunction,
          new UserFunction(
            ["name"],
            new Block([
              new PrintStatement(
                new FanctorsAndOperator(
                  new Primary(PrimaryType.String, "hello, "),
                  OperatorForFanctors.Plus,
                  new Primary(PrimaryType.Identifier, "name"),
                ),
              ),
            ]),
            greetFuncEnv,
          ),
        ),
      ),
  },
  {
    name: "add and print it",
    program: `fun add(a, b) {
  print a + b;
  }`,
    lines: 3,
    tokens: [
      { type: TokenType.Fun },
      { type: TokenType.Identifier, value: "add" },
      { type: TokenType.ParenLeft },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Comma },
      { type: TokenType.Identifier, value: "b" },
      { type: TokenType.ParenRight },
      { type: TokenType.BraceLeft },
      { type: TokenType.Print },
      { type: TokenType.Identifier, value: "a" },
      { type: TokenType.Plus },
      { type: TokenType.Identifier, value: "b" },
      { type: TokenType.SemiColon },
      { type: TokenType.BraceRight },
    ],
    ast: new FunctionDeclaration(
      "add",
      ["a", "b"],
      new Block([
        new PrintStatement(
          new FanctorsAndOperator(
            new Primary(PrimaryType.Identifier, "a"),
            OperatorForFanctors.Plus,
            new Primary(PrimaryType.Identifier, "b"),
          ),
        ),
      ]),
    ),
    value: new Value(ValueType.Nil, null),
    environmentBefore: addFuncEnv,
    environmentAfter: new Environment()
      .add(
        "add",
        new Value(
          ValueType.UserFunction,
          new UserFunction(
            ["a", "b"],
            new Block([
              new PrintStatement(
                new FanctorsAndOperator(
                  new Primary(PrimaryType.Identifier, "a"),
                  OperatorForFanctors.Plus,
                  new Primary(PrimaryType.Identifier, "b"),
                ),
              ),
            ]),
            addFuncEnv,
          ),
        ),
      ),
  },
];
