export enum TokenType {
  // 1 chacter
  ParenLeft = "(",
  ParenRight = ")",
  BracketLeft = "[",
  BracketRight = "]",
  BraceLeft = "{",
  BraceRight = "}",
  Comma = ",",
  Dot = ".",
  Minus = "-",
  Plus = "+",
  SemiColon = ";",
  Slash = "/",
  Star = "*",

  // 1 or 2 chacters
  Bang = "!",
  BangEqual = "!=",
  Equal = "=",
  EqualEqual = "==",
  Greater = ">",
  GreaterEqual = ">=",
  Less = "<",
  LessEqual = "<=",

  // literals
  Identifier = "[identifier]",
  String = "[string]",
  Number = "[number]",

  // keywords
  And = "and",
  Class = "calss",
  Else = "else",
  False = "false",
  Fun = "fun",
  For = "for",
  If = "if",
  Nil = "nil",
  Or = "or",
  Print = "print",
  Return = "return",
  Super = "super",
  This = "this",
  True = "true",
  Var = "var",
  While = "while",

  EoF = "[EoF]",
}

export const keywords = [
  TokenType.And,
  TokenType.Class,
  TokenType.Else,
  TokenType.False,
  TokenType.Fun,
  TokenType.For,
  TokenType.If,
  TokenType.Nil,
  TokenType.Or,
  TokenType.Print,
  TokenType.Return,
  TokenType.Super,
  TokenType.This,
  TokenType.True,
  TokenType.Var,
  TokenType.While,
];

export type Token = {
  type: TokenType;
  value?: string | number;
};

export type LineNumber = number;
