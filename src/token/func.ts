import { keywords, LineNumber, Symbol, Token } from "./type.ts";
import { isAlphabet, isAplhaNumeric, isDigit } from "./util.ts";

export function tokenize(sourceCode: string): [Token[], LineNumber] {
  const sourceCodeLength = sourceCode.length;
  const tokens: Token[] = [];

  let cursor = 0;
  let lineNumber: LineNumber = 1;

  while (true) {
    if (cursor >= sourceCodeLength) {
      break;
    }

    const currentChar = sourceCode[cursor];
    cursor++;

    switch (currentChar) {
      case Symbol.ParenLeft:
        tokens.push({
          symbol: Symbol.ParenLeft,
        });
        break;
      case Symbol.ParenRight:
        tokens.push({
          symbol: Symbol.ParenRight,
        });
        break;
      case Symbol.BraceLeft:
        tokens.push({
          symbol: Symbol.BraceLeft,
        });
        break;
      case Symbol.BraceRight:
        tokens.push({
          symbol: Symbol.BraceRight,
        });
        break;
      case Symbol.Comma:
        tokens.push({
          symbol: Symbol.Comma,
        });
        break;
      case Symbol.Dot:
        tokens.push({
          symbol: Symbol.Dot,
        });
        break;
      case Symbol.Minus:
        tokens.push({
          symbol: Symbol.Minus,
        });
        break;
      case Symbol.Plus:
        tokens.push({
          symbol: Symbol.Plus,
        });
        break;
      case Symbol.SemiColon:
        tokens.push({
          symbol: Symbol.SemiColon,
        });
        break;
      case Symbol.Star:
        tokens.push({
          symbol: Symbol.Star,
        });
        break;
      case "\0":
      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        lineNumber++;
    }

    const nextChar = cursor < sourceCodeLength ? sourceCode[cursor] : "";

    switch (currentChar) {
      case Symbol.Bang:
        if (nextChar === Symbol.Equal) {
          tokens.push({
            symbol: Symbol.BangEqual,
          });
          cursor++;
        } else {
          tokens.push({
            symbol: Symbol.Bang,
          });
        }
        break;
      case Symbol.Equal:
        if (nextChar == Symbol.Equal) {
          tokens.push({
            symbol: Symbol.EqualEqual,
          });
          cursor++;
        } else {
          tokens.push({
            symbol: Symbol.Equal,
          });
        }
        break;
      case Symbol.Greater:
        if (nextChar == Symbol.Equal) {
          tokens.push({
            symbol: Symbol.GreaterEqual,
          });
          cursor++;
        } else {
          tokens.push({
            symbol: Symbol.Greater,
          });
        }
        break;
      case Symbol.Less:
        if (nextChar == Symbol.Equal) {
          tokens.push({
            symbol: Symbol.LessEqual,
          });
          cursor++;
        } else {
          tokens.push({
            symbol: Symbol.Less,
          });
        }
        break;
      case Symbol.Slash:
        if (nextChar == Symbol.Slash) {
          cursor++;
          while (sourceCode[cursor] != "\n") cursor++;
        } else {
          tokens.push({
            symbol: Symbol.Slash,
          });
        }
    }

    // Symbol.Number
    if (isDigit(currentChar)) {
      let value = currentChar;
      let nextChar = sourceCode[cursor];
      while (isDigit(nextChar) || nextChar == ".") {
        value += nextChar;
        cursor++;
        nextChar = sourceCode[cursor];
      }
      tokens.push({
        symbol: Symbol.Number,
        value: Number(value),
      });
    }

    // Symbol.Identifier
    if (isAlphabet(currentChar)) {
      let value = currentChar;
      let nextChar = sourceCode[cursor];
      while (isAplhaNumeric(nextChar) || nextChar == "_") {
        value += nextChar;
        cursor++;
        nextChar = sourceCode[cursor];
      }
      tokens.push({
        symbol: Symbol.Identifier,
        value: value,
      });
    }

    // Symbol.String
    if (currentChar == '"') {
      let value = "";
      while (sourceCode[cursor] != '"') {
        value += sourceCode[cursor];
        cursor++;
      }
      cursor++; // drop a double quotation at the end.
      tokens.push({
        symbol: Symbol.String,
        value: value,
      });
    }
  }

  // keywords
  for (const token of tokens) {
    if (keywords.includes(token.value as Symbol)) {
      token.symbol = token.value as Symbol;
      delete token.value;
    }
  }

  return [tokens, lineNumber];
}
