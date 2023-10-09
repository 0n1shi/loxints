export enum Symbol {
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
  Symbol.And,
  Symbol.Class,
  Symbol.Else,
  Symbol.False,
  Symbol.Fun,
  Symbol.For,
  Symbol.If,
  Symbol.Nil,
  Symbol.Or,
  Symbol.Print,
  Symbol.Return,
  Symbol.Super,
  Symbol.This,
  Symbol.True,
  Symbol.Var,
  Symbol.While,
];

export type Token = {
  symbol: Symbol;
  value?: string | number;
};

export type LineNumber = number;
